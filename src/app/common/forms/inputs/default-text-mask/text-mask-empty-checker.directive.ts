import {Directive, ElementRef, forwardRef, Input, Optional} from '@angular/core';
import {AbstractEmptyCheckerDirective} from '../../empty-checker/abstract-empty-checker.directive';
import {NgControl} from '@angular/forms';
import {DefaultTextMaskService} from './text-mask.service';

@Directive({
  selector: 'input[type="text"][textMask]:not([app-date]):not([app-phone])',
  providers: [
    {provide: AbstractEmptyCheckerDirective, useExisting: forwardRef(() => DefaultTextMaskEmptyCheckerDirective)}
  ]
})
export class DefaultTextMaskEmptyCheckerDirective extends AbstractEmptyCheckerDirective {

  @Input('textMask')
  textMaskConf: any;

  constructor(hostElementRef: ElementRef, @Optional() ngControl: NgControl, private defaultTextMaskService: DefaultTextMaskService) {
    super(hostElementRef, ngControl);
  }

  protected isElementValueEmpty(element: any) {
    return this.defaultTextMaskService.isEmpty(element.value, this.textMaskConf);
  }
}
