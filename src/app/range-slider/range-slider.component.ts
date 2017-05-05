import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RangeSliderComponent implements AfterViewInit {

  @ViewChild('rangeSlider')
  rangeSliderElement: ElementRef;

  @Input()
  name: String;

  @Input()
  unit: String;

  @Input()
  min: number;

  @Input()
  max: number;

  @Input()
  step: number;

  @Input()
  value: number;

  @Output()
  onValueChanged = new EventEmitter<number>();

  ngAfterViewInit(): void {

    let rangeSliderJQuery = $(this.rangeSliderElement.nativeElement);

    let that = this;

    rangeSliderJQuery.slider({
      orientation: "horizontal",
      range: "min",
      min: this.min,
      max: this.max,
      step: this.step,
      value: this.value,
      slide: function(event: any, ui: any) {
        that.value = ui.value;
        that.onValueChanged.emit(ui.value);
      }
    });
  }
}
