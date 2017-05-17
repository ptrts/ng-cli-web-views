import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EnumValueModel} from './enum-value-model';
import {EnumValueModelUtils} from './enum-value-model-utils';

@Component({
  selector: 'app-enum-radio-group',
  templateUrl: './enum-radio-group.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EnumRadioGroupComponent),
      multi: true
    }
  ]
})
export class EnumRadioGroupComponent implements ControlValueAccessor, OnInit {

  @Input()
  name: string;

  @Input('enum')
  ourEnum: any;

  enumValuesModel: EnumValueModel[];

  value: number;

  onChange(value: any) {}

  ngOnInit(): void {
    this.enumValuesModel = EnumValueModelUtils.fromEnum(this.ourEnum);
  }

  onClick(event: any) {
    this.value = Number(event.target.children[0].value);
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }
}
