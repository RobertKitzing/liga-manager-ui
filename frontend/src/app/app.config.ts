import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ApolloModule } from 'apollo-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { GraphqlService, httpLoaderFactory } from './shared/services';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoadingIndicatorHttpInterceptor } from './shared/interceptors';
import { MatDialogConfig } from '@angular/material/dialog';

export const defaultDialogConfig = {
    // width: '50vw',
    // height: '50vh',
} as MatDialogConfig

function graphqlFactory(provider: GraphqlService) {
    return () => provider.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
        ApolloModule,
        NgxWebstorageModule.forRoot(),
        TranslateModule.forRoot({
            defaultLanguage: 'en-GB',
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ),
    {
        provide: APP_INITIALIZER,
        useFactory: graphqlFactory,
        deps: [GraphqlService],
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingIndicatorHttpInterceptor,
        multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
};
