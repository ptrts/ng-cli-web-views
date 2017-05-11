import {Component} from '@angular/core';

@Component({
  selector: 'app-access-restricted',
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col">
          <div class="jumbotron">
            <div class="display-1 text-center">Ошибка!</div>
            <div class="display-2 text-center">Доступ запрещен</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AccessRestrictedComponent {
}
