/* Collection of all the RumiLMS HttpInterceptor implementations */

import { HTTP_INTERCEPTORS } from '@angular/common/http';

//Import all HttpInterceptor providers here
import { HttpContentTypeHeaderInterceptor } from './http-contenttype-interceptor';

// Register all the Http Interceptor providers here.
// And, export them for use in other modules within the app.
export const HttpInterceptorProviders = [
        {
            provide: HTTP_INTERCEPTORS, useClass: HttpContentTypeHeaderInterceptor, multi:true
        },
];
