import {Directive, ElementRef, forwardRef, Input, OnInit} from '@angular/core';
import {conformToMask} from 'angular2-text-mask';
import {AbstractEmptyCheckerWorker} from '../../empty-checker/abstract-empty-checker-worker.directive';
import {APP_EMPTY_CHECKER_WORKERS} from '../../empty-checker/leaf-empty-checker.directive';

@Directive({
  selector: 'input[type="text"][textMask]',
  providers: [
    {
      provide: APP_EMPTY_CHECKER_WORKERS,
      useExisting: forwardRef(() => TextMaskEmptyCheckerWorker),
      multi: true
    }
  ]
})
export class TextMaskEmptyCheckerWorker extends AbstractEmptyCheckerWorker implements OnInit {

  readonly priority: number = 3;

  @Input('textMask')
  textMaskConf: any;

  private emptyValue: string;

  constructor(private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.emptyValue = conformToMask('', this.textMaskConf.mask, {}).conformedValue;
  }

  extractEmptyState() {
    let element = this.elementRef.nativeElement;
    return element.value === this.emptyValue || !(element.value)
  }
}
