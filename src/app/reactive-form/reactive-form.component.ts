import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DateTextMaskService} from '../date-text-mask.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {

  model: RegistrationFormStep1 = new RegistrationFormStep1;

  form: FormGroup;

  constructor(private fb: FormBuilder, public dateTextMaskService: DateTextMaskService) {
    this.form = this.fb.group({
      birthDate: dateTextMaskService.toInputValue(this.model.birthDate)
    });
  }
}

class RegistrationFormStep1 {
  birthDate: Date = new Date(1980, 12 - 1, 31);
}
