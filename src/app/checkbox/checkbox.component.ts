import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  template: `
    <div (click)="onClick()" class="our-border-darker-green">
      <span *ngIf="value" class="fa fa-check our-darker-green"></span>
    </div>
  `,
  styles: [`
    div {
      width: 3rem;
      height: 3rem;
      border-width: 4px;
      border-style: solid;
      border-radius: 7px;
      font-size: 2em !important;
      line-height: 2.5rem !important;
      text-align: center;
      background-color: white;
    }

    div:hover {
      background-color: #eeeeee;
    }
  `]
})
export class OurCheckboxComponent {

  @Input()
  value: boolean = false;

  @Output()
  onChanged = new EventEmitter<boolean>();

  onClick() {
    this.value = !this.value;
    console.log('OurCheckboxComponent.onClick(): 1');
    this.onChanged.emit(this.value);
    console.log('OurCheckboxComponent.onClick(): 2');
  }
}
