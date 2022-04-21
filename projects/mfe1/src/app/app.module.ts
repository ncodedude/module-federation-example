import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlightsModule } from './flights/flights.module';
import { APP_ROUTES } from './app.routes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventBusModule } from 'event-bus';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
    BrowserModule,
    HttpClientModule,
    EventBusModule,
    FlightsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RouterModule.forRoot(APP_ROUTES),
  ],
  declarations: [HomeComponent, AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
