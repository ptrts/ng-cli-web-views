import {Component, Input, OnInit} from '@angular/core';
import {ValidationMessageService} from '../validation-message.service';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {

  @Input('errors')
  errors: {[key: string]: any};

  constructor(public validationMessageService: ValidationMessageService) {}

  ngOnInit() {
  }
}
