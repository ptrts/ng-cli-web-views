import {Component, Directive, Inject, InjectionToken, Input, NgModule, OnInit, Optional} from '@angular/core';
import {ValidationMessageService} from '../validation-message.service';
import {NgModel} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

export interface ValidationMessages {
  [key: string]: string
}

export interface ValidationMessagesProvider {
  getMessages(formControlName: string): ValidationMessages;
}

export const APP_VALIDATION_MESSAGES_PROVIDER = new InjectionToken<ValidationMessagesProvider>('APP_VALIDATION_MESSAGES_PROVIDER');

@Directive({
  selector: '.form-group'
})
export class BootstrapFormGroupDirective {

  ngModel: NgModel;

  constructor() {
  }
}

@Directive({
  selector: '[ngModel]'
})
export class NgModelSpyDirective {

  constructor(private ngModel: NgModel,
              @Optional() private bootstrapFormGroupDirective: BootstrapFormGroupDirective) {

    if (bootstrapFormGroupDirective != null) {
      bootstrapFormGroupDirective.ngModel = ngModel;
    }
  }
}

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {

  messages: { [key: string]: string };

  ngModel: NgModel;

  constructor(public validationMessageService: ValidationMessageService,
              @Inject(APP_VALIDATION_MESSAGES_PROVIDER) private validationMessagesProvider: ValidationMessagesProvider,
              private bootstrapFormGroupDirective: BootstrapFormGroupDirective) {

    this.ngModel = bootstrapFormGroupDirective.ngModel;
  }

  ngOnInit() {
    this.messages = this.validationMessagesProvider.getMessages(this.ngModel.name);
  }
}

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    BootstrapFormGroupDirective,
    NgModelSpyDirective,
    ValidationMessageComponent
  ],
  exports: [
    BootstrapFormGroupDirective,
    NgModelSpyDirective,
    ValidationMessageComponent
  ]
})
export class ValidationMessageComponentModule {
}
