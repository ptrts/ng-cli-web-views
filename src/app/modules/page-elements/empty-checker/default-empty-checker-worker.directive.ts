import {Directive, forwardRef} from '@angular/core';
import {AbstractEmptyCheckerWorker} from './abstract-empty-checker-worker.directive';
import {APP_EMPTY_CHECKER_WORKERS} from './leaf-empty-checker.directive';

@Directive({
  selector: '[ngModel],[formControl],[formControlName]',
  providers: [
    {
      provide: APP_EMPTY_CHECKER_WORKERS,
      useExisting: forwardRef(() => DefaultEmptyCheckerWorker),
      multi: true
    }
  ]
})
export class DefaultEmptyCheckerWorker extends AbstractEmptyCheckerWorker {

  readonly priority: number = 1;

  extractEmptyState(): boolean {
    return false;
  }
}
