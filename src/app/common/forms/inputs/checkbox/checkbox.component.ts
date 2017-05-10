import {Component, EventEmitter, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  template: `
    <div (click)="onClick()" class="our-border-darker-green">
      <span *ngIf="value" class="fa fa-check our-darker-green" [class.disabled]="disabled"></span>
    </div>
  `,
  styles: [`
    div {
      width: 3rem;
      height: 3rem;
      border-width: 4px;
      border-style: solid;
      border-radius: 7px;
      font-size: 2em !important;
      line-height: 2.5rem !important;
      text-align: center;
      background-color: white;
    }

    div:hover {
      background-color: #eeeeee;
    }
    
    div.disabled {
      background-color: #eeeeee;
      cursor: not-allowed;
      pointer-events: none;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OurCheckboxComponent),
      multi: true
    }
  ]
})
export class OurCheckboxComponent implements ControlValueAccessor {

  value = false;

  disabled = false;

  onChanged = new EventEmitter<boolean>();

  onClick() {
    if (!this.disabled) {
      this.value = !this.value;
      this.onChanged.emit(this.value);
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    // У нас события blur не будет, но пускай будет как-будто у нас blur сразу после клика
    this.onChanged.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
