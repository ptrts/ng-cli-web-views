import {ElementRef, OnInit} from '@angular/core';
import {NgControl} from '@angular/forms';

export abstract class AbstractEmptyCheckerDirective implements OnInit {

  private _element: any;

  private _empty: boolean = null;

  protected constructor(hostElementRef: ElementRef, private ngControl: NgControl) {
    this._element = hostElementRef.nativeElement;
  }

  ngOnInit(): void {

    const that = this;

    this._element.addEventListener('input', () => {
      that.onInput();
    });

    that.updateEmpty();

    if (this.ngControl) {
      this.ngControl.valueChanges.subscribe(() => that.updateEmpty());
    }
  }

  private setEmpty(empty: boolean) {

    // Если старое не равное новому
    if (empty !== this._empty) {

      // Если старое было true, то убрать класс, т.к. оно уже не true
      if (this._empty) {
        this._element.classList.remove('app-empty');
      }

      // Если новое true, то добавить класс, это логично
      if (empty) {
        this._element.classList.add('app-empty');
      }

      // Если старое было false
      if (this._empty === false) {
        this._element.classList.remove('app-not-empty');
      }

      // Если новое стало false, добавить класс
      if (empty === false) {
        this._element.classList.add('app-not-empty');
      }

      this._empty = empty;
    }
  }

  get empty() {
    return this._empty;
  }

  get notEmpty() {
    return !this._empty;
  }

  private onInput() {
    this.updateEmpty();
  }

  private updateEmpty() {
    this.setEmpty(this.isElementValueEmpty(this._element));
  }

  protected abstract isElementValueEmpty(element: any): boolean;
}
