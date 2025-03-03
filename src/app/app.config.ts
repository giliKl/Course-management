import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '../Interceptor/token.interceptor';
import { errorInterceptor } from '../Interceptor/error.interceptor';
import { loadingInterceptor } from '../Interceptor/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(withInterceptors([tokenInterceptor,loadingInterceptor,errorInterceptor])), provideClientHydration(withEventReplay())]
};
