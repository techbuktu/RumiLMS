/*import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';


@Injectable()
export class HttpApiCORSHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const reqClone = req.clone({
            headers: req.headers.set('Access-Control-Allow-Origin', 'http://localhost:8000/api/')
        });
        return next.handle(reqClone);
    }
};

*/