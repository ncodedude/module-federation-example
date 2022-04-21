import { Injectable } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';

@Injectable({
  providedIn: 'root',
})
export class EventBus {
  private userName: string;

  public get user(): string {
    return this.userName;
  }

  constructor(private eventBus: NgEventBus) {}

  emit(event: string, data: any) {
    this.eventBus.cast(event, data);
  }

  on(event: string) {
    return this.eventBus.on(event);
  }
}
