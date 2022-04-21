import {
  Component,
  ViewChild,
  ViewContainerRef,
  ɵrenderComponent as renderComponent,
  Inject,
  Injector,
  ComponentFactoryResolver,
} from '@angular/core';
import { AuthLibService } from 'auth-lib';
import { HttpClient } from '@angular/common/http';
import { EventBus } from 'event-bus';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'shell';

  constructor(
    private service: AuthLibService,
    http: HttpClient,
    private eventBus: EventBus,
    public translate: TranslateService
  ) {
    this.eventBus.on('GET_TEST').subscribe(() => {
      this.eventBus.emit('SEND_TEST', { result: 'Dark' });
    });

    this.eventBus.on('SET_LOCATION').subscribe((data: any) => {
      translate.use(data._data.location);
    });

    // Register translation languages
    translate.addLangs(['en', 'es']);
    // Set default language
    translate.setDefaultLang('en');
  }

  translateLanguageTo(lang: string) {
    this.translate.use(lang);

    this.eventBus.emit('SET_LOCATION', lang);
  }
}
