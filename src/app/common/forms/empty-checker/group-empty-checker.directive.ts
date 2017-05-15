import {Directive, ElementRef, forwardRef, Optional, SkipSelf} from '@angular/core';
import {ControlContainer} from '@angular/forms';
import 'rxjs/add/observable/merge';
import {AbstractEmptyChecker} from './abstract-empty-checker';

export abstract class EmptyCheckerContainer extends AbstractEmptyChecker {
  abstract registerChild(emptyChecker: AbstractEmptyChecker);
}

@Directive({
  selector: '[ngForm],[formGroup],[formGroupName],[formArray],[formArrayName]',
  providers: [
    {
      provide: EmptyCheckerContainer,
      useExisting: forwardRef(() => EmptyCheckerGroup)
    },
    {
      provide: AbstractEmptyChecker,
      useExisting: forwardRef(() => EmptyCheckerGroup)
    }
  ],
  exportAs: 'emptyChecker'
})
export class EmptyCheckerGroup extends EmptyCheckerContainer {

  private children: Array<AbstractEmptyChecker> = [];

  constructor(elementRef: ElementRef,
              controlContainer: ControlContainer,
              @Optional() @SkipSelf() parent: EmptyCheckerContainer) {

    super(elementRef, controlContainer, parent);
  }

  registerChild(emptyChecker: AbstractEmptyChecker) {

    // console.log(`======================================`);
    // console.log(`registerChild(...`);

    this.children.push(emptyChecker);

    // console.log(`this.controlDirective.path = ${this.controlDirective.path}`);
    // console.log(`this.children.length = ${this.children.length}`);

    let that = this;

    emptyChecker.emptyStateChanges.subscribe(someChildEmptyState => {

      // console.log(`someChildEmptyState = ${someChildEmptyState}`);

      if (someChildEmptyState) {
        let newEmpty = that.recalculateEmptyState();
        that.onNewEmpty(newEmpty);
      } else {
        that.onNewEmpty(false);
      }
    });
  }

  private recalculateEmptyState(): boolean {
    return this.children.every(it => it.empty);
  }
}
