import {ElementRef, EventEmitter} from '@angular/core';
import {AbstractControlDirective} from '@angular/forms';
import {EmptyCheckerGroup} from './group-empty-checker.directive';

export abstract class AbstractEmptyChecker {

  protected element: any;

  private _empty: boolean = null;

  emptyStateChanges = new EventEmitter<boolean>();

  protected constructor(hostElementRef: ElementRef,
                        protected controlDirective: AbstractControlDirective,
                        private parentGroup: EmptyCheckerGroup) {

    this.element = hostElementRef.nativeElement;
  }

  ngOnInit(): void {

    console.log('ngOnInit(), this.controlDirective.path = ' + this.controlDirective.path);

    this.parentGroup.registerChild(this);
  }

  get empty() {
    return this._empty;
  }

  get notEmpty() {
    return !this._empty;
  }

  protected onNewEmpty(newEmpty: boolean) {

    console.log(`
=====================================================================================
Control path: ${this.controlDirective.path}
empty: ${newEmpty}
this._empty: ${this._empty}`);

    // Если старое не равное новому
    if (newEmpty !== this._empty) {
      this.element.classList.remove('app-empty');
      this.element.classList.remove('app-not-empty');
      // Если новое true, то добавить класс, это логично
      if (newEmpty === true) {
        this.element.classList.add('app-empty');
      }
      // Если новое стало false, добавить класс
      if (newEmpty === false) {
        this.element.classList.add('app-not-empty');
      }
      this._empty = newEmpty;
      console.log('this._empty = ' + this._empty);
      console.log('');

      this.emptyStateChanges.next(this._empty);
    }
  }
}
