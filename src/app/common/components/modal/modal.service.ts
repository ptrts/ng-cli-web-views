import { Injectable } from '@angular/core';

declare const $: any;

@Injectable()
export class ModalService {

  private _header: string;

  private _text: string;

  get header() {
    return this._header;
  }

  get text() {
    return this._text;
  }

  constructor() { }

  show(header: string, text: string) {
    this._header = header;
    this._text = text;

    $('#modal').modal();
  }

  warning(text: string) {
    this.show('Внимание!', text);
  }
}
