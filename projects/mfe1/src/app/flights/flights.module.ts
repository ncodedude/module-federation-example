import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsSearchComponent } from './flights-search/flights-search.component';
import { RouterModule } from '@angular/router';
import { FLIGHTS_ROUTES } from './flights.routes';
import { AuthLibModule } from 'auth-lib';
import { SharedLibModule } from 'shared-lib';
import { EventBusModule } from 'event-bus';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

//Mover para Libs e colocar o caminho do assets nas variáveis de ambiente
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'http://localhost:5004/assets/i18n/',
    '.json'
  );
}

@NgModule({
  imports: [
    CommonModule,
    AuthLibModule,
    EventBusModule,
    SharedLibModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RouterModule.forChild(FLIGHTS_ROUTES),
  ],
  declarations: [FlightsSearchComponent],
})
export class FlightsModule {}
