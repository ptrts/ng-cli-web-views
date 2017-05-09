import {Inject, Injectable, InjectionToken, NgModule, Optional, Provider, Type} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

export abstract class ValidationMessageBuilder {

  readonly key: string;

  abstract buildMessage(validationMessageParameters: any): string;
}

export const APP_VALIDATION_MESSAGE_BUILDER = new InjectionToken<ValidationMessageBuilder>('APP_VALIDATION_MESSAGE_BUILDER');

export function buildValidationMessageBuilderProvider(clazz: Type<any>): Provider {
  return {
    provide: APP_VALIDATION_MESSAGE_BUILDER,
    useClass: clazz,
    multi: true
  };
}

@Injectable()
export class ValidationMessageService {

  private map: {[key: string]: ValidationMessageBuilder} = {};

  constructor(@Inject(APP_VALIDATION_MESSAGE_BUILDER) @Optional() private builders: ValidationMessageBuilder[]) {

    if (builders == null) {
      return;
    }

    for (let builder of builders) {
      this.map[builder.key] = builder;
    }
  }

  buildMessage(messageKey: string, messageParameters: any): string {

    let validationMessageBuilder = this.map[messageKey];

    if (validationMessageBuilder == null) {
      throw new Error('Не найден ValidationMessageBuilder по ключу ' + messageKey);
    }

    return validationMessageBuilder.buildMessage(messageParameters);
  }

  buildMessages(errors: ValidationErrors): string[] {

    let keys = Object.getOwnPropertyNames(errors);

    return keys.map((key: string) => {
      let parameters = errors[key];
      return this.buildMessage(key, parameters);
    });
  }
}

export class RequiredMessageBuilder extends ValidationMessageBuilder {

  readonly key = 'required';

  buildMessage(parameters: any): string {
    return 'Значение должно быть заполнено';
  }
}

@NgModule({

  providers: [

    RequiredMessageBuilder

  ].map(buildValidationMessageBuilderProvider).concat([

    ValidationMessageService

  ])
})
export class ValidationMessageServiceModule {
}
