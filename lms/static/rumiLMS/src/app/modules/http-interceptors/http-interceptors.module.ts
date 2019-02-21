import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpContentTypeHeaderInterceptor } from './http-contenttype-interceptor';
//import { HttpApiCORSHeaderInterceptor } from './api-request-cors-header-interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpContentTypeHeaderInterceptor, multi:true
    },
    //{ provide: HTTP_INTERCEPTORS, useClass: HttpApiCORSHeaderInterceptor, multi:true}
  ]
})
export class HttpInterceptorsModule { }
