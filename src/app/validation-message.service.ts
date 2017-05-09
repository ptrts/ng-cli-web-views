import {Injectable} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

@Injectable()
export class ValidationMessageService {

  buildMessages(errors: ValidationErrors, messages: { [key: string]: string }): string[] {

    let keys = Object.getOwnPropertyNames(errors);

    return keys.map((key: string) => {

      let message = messages[key];

      if (message) {
        return message;
      } else {
        let errorParameters = errors[key];
        if (typeof errorParameters === 'string') {
          return errorParameters;
        }
        return `Наружено правило валидации ${key}`;
      }
    });
  }
}
