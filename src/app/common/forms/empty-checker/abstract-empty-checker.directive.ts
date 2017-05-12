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

    console.log(`
=====================================================================================
Control Name: ${this.ngControl.name}
empty: ${empty}
this._empty: ${this._empty}`);

    // Если старое не равное новому
    if (empty !== this._empty) {

      this._element.classList.remove('app-empty');
      this._element.classList.remove('app-not-empty');

      // Если новое true, то добавить класс, это логично
      if (empty === true) {
        this._element.classList.add('app-empty');
      }

      // Если новое стало false, добавить класс
      if (empty === false) {
        this._element.classList.add('app-not-empty');
      }

      this._empty = empty;

      console.log('this._empty = ' + this._empty);
      console.log('');
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
