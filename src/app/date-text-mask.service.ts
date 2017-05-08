import {Injectable} from '@angular/core';
import {createAutoCorrectedDatePipe} from 'text-mask-addons/dist/textMaskAddons';
import {conformToMask} from 'angular2-text-mask';
import * as moment from 'moment';

const MOMENT_FORMAT = 'DD.MM.YYYY';

@Injectable()
export class DateTextMaskService {

  readonly conf = {
    mask: [
      /[0-3]/,
      /\d/,
      '.',
      /[0-1]/,
      /\d/,
      '.',
      /[1-2]/,
      /\d/,
      /\d/,
      /\d/
    ],
    keepCharPositions: true,
    showMask: true,
    pipe: createAutoCorrectedDatePipe('dd.mm.yyyy')
  };

  private emptyDateConformed: string;

  constructor() {
    this.emptyDateConformed = conformToMask('', this.conf.mask, {}).conformedValue;
  }

  parseInputValue(inputValue: string) {
    return moment(inputValue, MOMENT_FORMAT, true);
  }

  fromInputValue(inputValue: string) {
    let theMoment = this.parseInputValue(inputValue);
    if (theMoment.isValid()) {
      return theMoment.toDate();
    } else {
      return null;
    }
  }

  toInputValue(date: Date) {
    if (date == null) {
      return this.emptyDateConformed;
    } else {
      return moment(date).format(MOMENT_FORMAT);
    }
  }

  isEmpty(inputValue: string) {
    return inputValue == this.emptyDateConformed || inputValue == '';
  }
}
