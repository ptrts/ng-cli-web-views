import {Directive, ElementRef} from '@angular/core';
import {AbstractEmptyCheckerDirective} from './abstract-empty-checker.directive';

@Directive({
  selector: 'input[type="text"]:not([app-date][textMask])'
})
export class DefaultEmptyCheckerDirective extends AbstractEmptyCheckerDirective {

  constructor(hostElementRef: ElementRef) {
    super(hostElementRef);
  }

  protected isElementValueEmpty(element: any) {
    return element.value === '';
  }
}
