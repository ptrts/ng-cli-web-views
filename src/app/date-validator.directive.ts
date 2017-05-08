import {Directive, forwardRef} from '@angular/core';
import {FormControl, NG_VALIDATORS} from '@angular/forms';
import {DateTextMaskService} from './date-text-mask.service';
import * as moment from 'moment';

const TOO_EARLY = new Date(1910, 0, 1);

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
export class DateValidator {

  constructor(private dateTextMaskService: DateTextMaskService) { }


  validate(c: FormControl) {

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

        if (flags.overflow == -1) {

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
