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
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'shell';

  themas = ['light', 'dark', 'dark-green'];

  constructor(
    private service: AuthLibService,
    http: HttpClient,
    private eventBus: EventBus,
    public translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.eventBus.on('GET_TEST').subscribe(() => {
      debugger;
      this.eventBus.emit('SEND_TEST', { result: 'Light' });
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

  changeThema(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName + '.css';
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}.css`;

      head.appendChild(style);
    }
  }
}
