import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withInterceptors } from '@angular/common/http';

import {routes} from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';	

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([AuthInterceptor])  
  )
]
};
