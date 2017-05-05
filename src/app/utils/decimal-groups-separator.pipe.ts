import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'decimalGroupsSeparator'
})
export class DecimalGroupsSeparatorPipe implements PipeTransform {

  transform(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
