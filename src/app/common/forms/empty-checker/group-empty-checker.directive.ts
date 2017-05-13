import {Directive, ElementRef, forwardRef, Optional, SkipSelf} from '@angular/core';
import {AbstractEmptyChecker} from './abstract-empty-checker';
import {ControlContainer} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';

@Directive({
  selector: '[ngForm],[formGroup],[formGroupName],[formArray],[formArrayName]',
  providers: [
    {
      provide: EmptyCheckerGroup,
      useExisting: forwardRef(() => EmptyCheckerGroup)
    }
  ]
})
export class EmptyCheckerGroup extends AbstractEmptyChecker {

  private children: Array<AbstractEmptyChecker> = [];

  constructor(elementRef: ElementRef,
              controlContainer: ControlContainer,
              @Optional() @SkipSelf() parentGroup: EmptyCheckerGroup) {

    super(elementRef, controlContainer, parentGroup);
  }

  ngOnInit() {

    this.bindOnNewEmpty();

    super.ngOnInit();
  }

  private bindOnNewEmpty() {

    let childObservables = this.children.map(it => it.emptyStateChanges);

    let allChildrenChangesObservable = Observable.merge(childObservables);

    let that = this;

    allChildrenChangesObservable.subscribe(someChildEmptyState => {

      if (someChildEmptyState) {
        let newEmpty = that.recalculateEmptyState();
        that.onNewEmpty(newEmpty);
      } else {
        that.onNewEmpty(false);
      }
    });
  }

  registerChild(emptyChecker: AbstractEmptyChecker) {
    this.children.push(emptyChecker);
  }

  private recalculateEmptyState(): boolean {
    return this.children.every(it => it.empty);
  }
}
