import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'counter-input',
  template: `
    <button (click)="increment()">+</button>
    {{counterValue}}
    <button (click)="decrement()">-</button>
  `,
  providers: [
    {
      // Настраиваем провайдер для такого токена
      provide: NG_VALUE_ACCESSOR,
      // Использовать уже существующий токен CounterInputComponent
      // Указываем его не напрямую, а через функцию forwardRef(...), т.к.
      // этот класс еще только будет в этом файле
      useExisting: forwardRef(() => CounterInputComponent),
      // Наше значение не делать как единственное значение для токена, а добавить к коллекции
      // уже имеющихся значений для токена
      multi: true
    }
  ]
})
export class CounterInputComponent implements ControlValueAccessor {

  @Input()
  counterValue = 0;

  private onChangeSubject = new Subject();

  private onTouchedSubject = new Subject();

  increment() {
    this.counterValue++;
    this.onChangeSubject.next(this.counterValue);
  }

  decrement() {
    this.counterValue--;
    this.onChangeSubject.next(this.counterValue);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.counterValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeSubject.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedSubject.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
  }
}
