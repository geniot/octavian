import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {version} from "../version";
import {InfoService} from "../services/infoservice";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  readonly VERSION_HEADER_NAME: string = "X-Octavian-Server-Version";

  constructor(public infoService: InfoService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!(req.body instanceof FormData)) {
      let contentHeaders = req.headers || new HttpHeaders();
      contentHeaders = contentHeaders.append('Accept', 'application/json');
      contentHeaders = contentHeaders.append('Content-Type', 'application/json');
      req = req.clone({
        headers: contentHeaders
      });
    }
    return next.handle(req)
      .pipe(map(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              if (event.headers.has(this.VERSION_HEADER_NAME)) {
                let serverVersion = event.headers.get(this.VERSION_HEADER_NAME);
                if (serverVersion != version.number && !this.isLocalHost()) {
                  console.log(serverVersion + "!=" + version.number);
                  // window.location.reload();
                }
              }
            }
            return event;
          }
        )
      );

  }

  isLocalHost(): boolean {
    return window.location.toString().includes("localhost") || window.location.toString().includes("127.0.0.1");
  }
}
