import {Injectable} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

@Injectable()
export class ValidationMessageService {

  buildMessages(errors: ValidationErrors, messages: { [key: string]: string }): string[] {

    const keys = Object.getOwnPropertyNames(errors);

    return keys.map((key: string) => {

      const message = messages[key];

      if (message) {
        return message;
      } else {
        const errorParameters = errors[key];
        if (typeof errorParameters === 'string') {
          return errorParameters;
        }
        return `Наружено правило валидации ${key}`;
      }
    });
  }
}
