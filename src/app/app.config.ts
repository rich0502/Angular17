import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {appHttpInterceptor} from "./services/app-http.interceptor";
import {errorInterceptor} from "./services/error.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideClientHydration(), provideHttpClient(withFetch(),
      withInterceptors([
        appHttpInterceptor,
        errorInterceptor
    ]))
  ]
};
