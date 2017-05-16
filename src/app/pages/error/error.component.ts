import {Component} from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <div class="row justify-content-center">
      <div class="col">
        <div class="jumbotron">
          <div class="display-1 text-center">Ошибка!</div>
          <div class="display-2 text-center">Такой страницы нет</div>
        </div>
      </div>
    </div>
  `
})
export class ErrorComponent {
}
