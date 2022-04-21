import { HttpClient } from '@angular/common/http';
import {
  Component,
  ViewChild,
  ViewContainerRef,
  Inject,
  Injector,
  ComponentFactoryResolver,
  OnInit,
} from '@angular/core';
import { AuthLibService } from 'auth-lib';
import { EventBus } from 'event-bus';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html',
})
export class FlightsSearchComponent {
  tema: string;
  constructor(private eventBus: EventBus, public translate: TranslateService) {
    // Register translation languages
    translate.addLangs(['en', 'es']);
    // Set default language
    translate.setDefaultLang('en');

    this.eventBus.on('SEND_TEST').subscribe((data) => {
      this.tema = JSON.stringify(data);
    });

    this.eventBus.on('SET_LOCATION').subscribe((data: any) => {
      console.log(data._data);
      translate.use(data._data);
    });
  }

  getEvent() {
    this.eventBus.emit('GET_TEST', {});
  }
}
