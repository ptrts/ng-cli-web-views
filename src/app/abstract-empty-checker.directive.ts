import {ElementRef, OnInit} from '@angular/core';
import {nextTick} from 'q';

export abstract class AbstractEmptyCheckerDirective implements OnInit {

  private _element: any;

  private _empty: boolean = null;

  protected constructor(hostElementRef: ElementRef) {
    this._element = hostElementRef.nativeElement;
  }

  ngOnInit(): void {

    let that = this;

    this._element.addEventListener('input', (event: any) => {
      that.onInput();
    });

    // Если мы как директива висим на input, на котором уже висит NgModel, то
    // в нашем личном вызове ngOnInit() это не факт, что NgModel уже успела положить
    // в элемент его первоначальное значение. Нам надо сделать тик, чтобы она успела, а мы уже после нее.
    // Тогда мы уже можем это значение проверять, и всяко-разно реагировать.
    nextTick(
      () => that.updateEmpty()
    );
  }

  private set empty(empty: boolean) {

    // Если старое не равное новому
    if (empty != this._empty) {

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

  private onInput() {
    this.updateEmpty();
  }

  private updateEmpty() {
    this.empty = this.isElementValueEmpty(this._element);
  }

  protected abstract isElementValueEmpty(element: any): boolean;
}
