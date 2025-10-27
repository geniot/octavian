import {Injectable, Injector} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../environments/environment";
import {LoginModel} from "../model/mds/loginmodel";
import {Role} from "../model/enums/role";
import {ROLES_MAP} from "../model/constants";
import {JwtHelperService} from "@auth0/angular-jwt";
import {plainToClass} from "class-transformer";
import {RequestPasswordResetModel} from "../model/mds/requestpasswordresetmodel";
import {ResetPasswordModel} from "../model/mds/resetpasswordmodel";
import {SignupModel} from "../model/mds/signupmodel";
import {RequestActivationLinkModel} from "../model/mds/requestactivationlinkmodel";
import {XHeader} from "../model/enums/xheader";
import {CatalogueService} from "./catalogueservice";
import {SubscriptionModel} from "../model/mds/subscriptionmodel";


@Injectable({providedIn: 'root'})
export class UserService {
  readonly baseApiUrl = environment.BASE_API_URL;
  readonly modelLocalStorageName = 'octavian-user-model';
  jwtHelperService: JwtHelperService = new JwtHelperService();

  loginModel: BehaviorSubject<LoginModel> = new BehaviorSubject<LoginModel>(new LoginModel());
  subscriptionModel: BehaviorSubject<SubscriptionModel> = new BehaviorSubject<SubscriptionModel>(new SubscriptionModel());
  signupModel: BehaviorSubject<SignupModel> = new BehaviorSubject<SignupModel>(new SignupModel());
  requestPasswordResetModel: BehaviorSubject<RequestPasswordResetModel> = new BehaviorSubject<RequestPasswordResetModel>(new RequestPasswordResetModel());
  requestActivationLinkModel: BehaviorSubject<RequestActivationLinkModel> = new BehaviorSubject<RequestActivationLinkModel>(new RequestActivationLinkModel());
  resetPasswordModel: BehaviorSubject<ResetPasswordModel> = new BehaviorSubject<ResetPasswordModel>(new ResetPasswordModel());

  isLoading: boolean = false;

  constructor(public http: HttpClient,
              public router: Router,
              private injector: Injector,
              private activatedRoute: ActivatedRoute) {
    let m: LoginModel = new LoginModel();
    if (localStorage.getItem(this.modelLocalStorageName)) {
      try {
        m = JSON.parse(<string>localStorage.getItem(this.modelLocalStorageName));
        m = plainToClass(LoginModel, m);
      } catch (e) {
        console.log("Couldn't parse local user model.");
      }
    }
    this.loginModel.next(m);
    if (m.jwt != null) {
      this.signIn(m.email, "")
    }
  }

  isUserLoggedIn(): boolean {
    return this.loginModel.value.jwt != null;
  }

  getUserRole(): Role {
    try {
      let sub: string = this.jwtHelperService.decodeToken(this.loginModel.value.jwt!)["ROLE"];
      if (ROLES_MAP.has(sub)) {
        return ROLES_MAP.get(sub)!;
      } else {
        return Role.REGISTERED;
      }
    } catch (e) {
      return Role.REGISTERED;
    }
  }

  signIn(email: string, password: string): void {
    const catalogueService: CatalogueService = this.injector.get<CatalogueService>(CatalogueService);
    let loginModel = new LoginModel();
    loginModel.email = email;
    loginModel.jwt = this.loginModel.value.jwt;
    this.isLoading = true;
    this.http.post<LoginModel>(
      this.baseApiUrl + '/user/login',
      JSON.stringify(loginModel),
      {headers: new HttpHeaders().append(XHeader.X_PASS, btoa(password))}
    )
      .subscribe(model => {
          this.isLoading = false;
          model = plainToClass(LoginModel, model);
          this.loginModel.next(model);
          if (!model.hasError && loginModel.jwt == null) {//we are logged in from logged out state, not a page reload
            catalogueService.loadCatalogue();
          }
        }
      );
  }

  refreshSubscription(): void {
    let model = new SubscriptionModel();
    this.isLoading = true;
    this.http.get<SubscriptionModel>(
      this.baseApiUrl + '/user/subscription',
      {headers: new HttpHeaders().append(XHeader.X_JWT, this.loginModel.value.jwt!)}
    )
      .subscribe(model => {
          this.isLoading = false;
          model = plainToClass(SubscriptionModel, model);
          this.subscriptionModel.next(model);
        },
        error => {
          this.isLoading = false;
          model = plainToClass(SubscriptionModel, model);
          this.subscriptionModel.next(model);
        }
      );
  }

  saveModel() {
    localStorage.setItem(this.modelLocalStorageName, JSON.stringify(this.loginModel.value));
  }

  sendActivationLink(email: string, captchaResponse: string) {
    let requestActivationLinkModel = new RequestActivationLinkModel();
    requestActivationLinkModel.email = email;
    requestActivationLinkModel.captchaResponse = captchaResponse;
    this.isLoading = true;
    this.http.post<RequestPasswordResetModel>(this.baseApiUrl + '/user/activation/send', JSON.stringify(requestActivationLinkModel))
      .subscribe(model => {
          this.isLoading = false;
          model = plainToClass(RequestPasswordResetModel, model);
          this.requestActivationLinkModel.next(model);
        }, error => {
          this.isLoading = false;
          requestActivationLinkModel.hasError = true;
          requestActivationLinkModel.message = error.toString();
          this.requestActivationLinkModel.next(requestActivationLinkModel);
        }
      );
  }

  sendResetLink(email: string, captchaResponse: string) {
    let requestResetModel = new RequestPasswordResetModel();
    requestResetModel.email = email;
    requestResetModel.captchaResponse = captchaResponse;
    this.isLoading = true;
    this.http.post<RequestPasswordResetModel>(this.baseApiUrl + '/user/reset/send', JSON.stringify(requestResetModel))
      .subscribe(model => {
          this.isLoading = false;
          model = plainToClass(RequestPasswordResetModel, model);
          this.requestPasswordResetModel.next(model);
        }, error => {
          this.isLoading = false;
          requestResetModel.hasError = true;
          requestResetModel.message = error.toString();
          this.requestPasswordResetModel.next(requestResetModel);
        }
      );
  }

  resetPassword(password: string, token: string) {
    let resetModel = new ResetPasswordModel();
    resetModel.resetToken = token;
    this.isLoading = true;
    this.http.post<ResetPasswordModel>(
      this.baseApiUrl + '/user/password/reset',
      JSON.stringify(resetModel),
      {headers: new HttpHeaders().append(XHeader.X_PASS, btoa(password))}
    )
      .subscribe(model => {
          this.isLoading = false;
          model = plainToClass(ResetPasswordModel, model);
          this.resetPasswordModel.next(model);
        }, error => {
          this.isLoading = false;
          resetModel.hasError = true;
          resetModel.message = error.toString();
          this.resetPasswordModel.next(resetModel);
        }
      );
  }

  signUp(email: string, signUpPassword: string, captchaResponse: string) {
    let signupModel = new SignupModel();
    signupModel.email = email;
    signupModel.captchaResponse = captchaResponse;
    this.isLoading = true;
    this.http.post<SignupModel>(
      this.baseApiUrl + '/user/signup',
      JSON.stringify(signupModel),
      {headers: new HttpHeaders().append(XHeader.X_PASS, btoa(signUpPassword))}
    )
      .subscribe(model => {
          this.isLoading = false;
          model = plainToClass(SignupModel, model);
          this.signupModel.next(model);
        }, error => {
          this.isLoading = false;
          signupModel.hasError = true;
          signupModel.message = error.toString();
          this.signupModel.next(signupModel);
        }
      );
  }
}
