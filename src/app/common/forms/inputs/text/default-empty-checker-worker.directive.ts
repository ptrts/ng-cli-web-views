import {Directive, ElementRef, forwardRef} from '@angular/core';
import {AbstractEmptyCheckerWorker} from '../../empty-checker/abstract-empty-checker-worker.directive';
import {APP_EMPTY_CHECKER_WORKERS} from '../../empty-checker/leaf-empty-checker.directive';

@Directive({
  selector: 'input[type="text"]',
  providers: [
    {
      provide: APP_EMPTY_CHECKER_WORKERS,
      useExisting: forwardRef(() => TextEmptyCheckerWorker),
      multi: true
    }
  ]
})
export class TextEmptyCheckerWorker extends AbstractEmptyCheckerWorker {

  readonly priority: number = 2;

  constructor(private elementRef: ElementRef) {
    super();
  }

  extractEmptyState() {
    let element = this.elementRef.nativeElement;
    return !(element.value);
  }
}
