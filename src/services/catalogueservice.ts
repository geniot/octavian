import {Injectable, Injector} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CatalogueModel} from "../model/mds/cataloguemodel";
import {plainToClass} from "class-transformer";
import {InfoService} from "./infoservice";
import {messages} from "../environments/messages";
import {AnyService} from "./anyservice";


@Injectable({providedIn: 'root'})
export class CatalogueService extends AnyService {
  catalogueModel: BehaviorSubject<CatalogueModel> = new BehaviorSubject<CatalogueModel>(new CatalogueModel());

  constructor(public http: HttpClient,
              private injector: Injector) {
    super();
  }

  loadCatalogue(): void {
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    infoService.loadingProgressMessage.next(messages.message_loading_catalogue);
    this.isLoading = true;
    this.http.get<CatalogueModel>(this.baseApiUrl + '/menu.json?rnd=' + Date.now()
    )
      .subscribe(model => {
          this.isLoading = false;
          model = plainToClass(CatalogueModel, model);
          this.catalogueModel.next(model);
        },
        error => {
          this.isLoading = false;
          console.error(error);
        });
  }
}
