import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers-interceptor';
import { error } from 'console';
import { errorsInterceptor } from './core/interceptors/errors-interceptor';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { LOADERS, NgxSpinnerModule } from 'ngx-spinner';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './core/utils/httpLoadFiles';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([headersInterceptor, errorsInterceptor, loadingInterceptor])
    ),
    provideAnimations(),
    importProvidersFrom(
      NgxSpinnerModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'en',
      })
    ),
    CookieService,
    provideToastr(),
  ],
};
