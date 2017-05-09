import {Directive, forwardRef, NgModule} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {DateTextMaskService} from './date-text-mask.service';
import * as moment from 'moment';
import {buildValidationMessageBuilderProvider, ValidationMessageBuilder} from './validation-message.service';

const TOO_EARLY = moment().subtract(80, 'year').toDate();

const TOO_LATE = moment().subtract(18, 'year').toDate();

@Directive({
  selector: 'input[type="text"][app-date][textMask]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateValidator),
      multi: true
    }
  ]
})
export class DateValidator implements Validator {

  constructor(private dateTextMaskService: DateTextMaskService) {
  }

  validate(c: AbstractControl): ValidationErrors {

    let inputValue = c.value;

    if (this.dateTextMaskService.isEmpty(inputValue)) {

      return { dateEmpty: {}}

    } else {

      let thisMoment = this.dateTextMaskService.parseInputValue(inputValue);

      if (thisMoment.isValid()) {

        // Moment хорошо распарсился. Проверяем получившуюся дату, насколько она адекватная

        let date = thisMoment.toDate();

        if (date < TOO_EARLY) {
          return {dateTooEarly: {min: TOO_EARLY}}
        }

        if (date > TOO_LATE) {
          return {dateTooLate: {max: TOO_LATE}}
        }

        return null;

      } else {

        // Moment плохо распарсился. Сообщаем об ошибках парсинга

        let flags = thisMoment.parsingFlags();

        if (flags.overflow == -1 || flags.unusedInput.length ) {

          return {dateNotCorrect: {}}

        } else {

          let datePart = flags.parsedDateParts[flags.overflow];

          switch (flags.overflow) {
            case 0:
              return {dateYearOverflow: {year: datePart}};
            case 1:
              return {dateMonthOverflow: {month: datePart}};
            case 2:
              return {dateDayOfMonthOverflow: {dayOfMonth: datePart}};
          }
        }
      }
    }
  }
}

export class DateMonthOverflowMessageBuilder extends ValidationMessageBuilder {

  readonly key = 'dateMonthOverflow';

  buildMessage(parameters: any): string {
    return `Слишком большой номер месяца (${parameters.month + 1})`;
  }
}

export class DateDayOfMonthOverflowMessageBuilder extends ValidationMessageBuilder {

  readonly key = 'dateDayOfMonthOverflow';

  buildMessage(parameters: any): string {
    return `Слишком большой номер дня месяца (${parameters.dayOfMonth})`;
  }
}

export class DateNotCorrectMessageBuilder extends ValidationMessageBuilder {

  readonly key = 'dateNotCorrect';

  buildMessage(parameters: any): string {
    return 'Не корректная дата';
  }
}

export class DateEmptyMessageBuilder extends ValidationMessageBuilder {

  readonly key = 'dateEmpty';

  buildMessage(parameters: any): string {
    return 'Пустая дата';
  }
}

export class DateTooLateMessageBuilder extends ValidationMessageBuilder {

  readonly key = 'dateTooLate';

  buildMessage(parameters: any): string {
    return 'Займы предоставляются гражданам старше 18 лет';
  }
}

export class DateTooEarlyMessageBuilder extends ValidationMessageBuilder {

  readonly key = 'dateTooEarly';

  buildMessage(parameters: any): string {
    return 'Займы предоставляются гражданам возрастом до 80 лет';
  }
}

@NgModule({

  providers: [

    DateMonthOverflowMessageBuilder,
    DateNotCorrectMessageBuilder,
    DateDayOfMonthOverflowMessageBuilder,
    DateEmptyMessageBuilder,
    DateTooLateMessageBuilder,
    DateTooEarlyMessageBuilder

  ].map(buildValidationMessageBuilderProvider),

  declarations: [
    DateValidator
  ],
  exports: [
    DateValidator
  ]
})
export class DateValidatorModule {
}
