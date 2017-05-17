import {Directive, forwardRef, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {DateTextMaskService} from './date-text-mask.service';

@Directive({
  selector: 'input[type="text"][appDate][textMask]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateTextMaskValidator),
      multi: true
    }
  ]
})
export class DateTextMaskValidator implements Validator {

  @Input('appMin')
  min: Date;

  @Input('appMax')
  max: Date;

  @Input('required')
  required: string;

  constructor(private dateTextMaskService: DateTextMaskService) {
  }

  validate(c: AbstractControl): ValidationErrors {

    const inputValue = c.value;

    if (this.dateTextMaskService.isEmpty(inputValue)) {

      if (this.required === undefined) {
        return null;
      } else {
        return {required: 'Пустая дата'};
      }

    } else {

      const thisMoment = this.dateTextMaskService.parseInputValue(inputValue);

      if (thisMoment.isValid()) {

        // Moment хорошо распарсился. Проверяем получившуюся дату, насколько она адекватная

        const date = thisMoment.toDate();

        if (date < this.min) {
          return {dateTooEarly: true};
        }

        if (date > this.max) {
          return {dateTooLate: true};
        }

        return null;

      } else {

        // Moment плохо распарсился. Сообщаем об ошибках парсинга

        const flags = thisMoment.parsingFlags();

        // Если дата в принципе вся распарсилась, но в некоторых полях стоят слишком большие цифры
        if (flags.unusedTokens.length === 0 && flags.unusedInput.length === 0 && flags.overflow > -1) {

          const datePart = flags.parsedDateParts[flags.overflow];

          switch (flags.overflow) {
            case 0:
              return {dateYearOverflow: `Год ${datePart + 1} находится слишком далеко в будущем`};
            case 1:
              return {dateMonthOverflow: `Слишком большой номер месяца (${datePart + 1})`};
            case 2:
              return {dateDayOfMonthOverflow: `Слишком большой номер дня месяца (${datePart})`};
          }
        }

        return {dateNotCorrect: 'Некорректная дата'};
      }
    }
  }
}
