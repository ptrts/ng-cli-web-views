import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextMaskModule} from 'angular2-text-mask';
import {DefaultTextMaskValidator} from './default-text-mask-validator.directive';
import {DefaultTextMaskEmptyCheckerWorker} from './default-text-mask-empty-checker-worker.directive';
import {DefaultTextMaskService} from './default-text-mask.service';

@NgModule({
  imports: [
    CommonModule,
    TextMaskModule,
  ],
  declarations: [
    DefaultTextMaskValidator,
    DefaultTextMaskEmptyCheckerWorker,
  ],
  providers: [
    DefaultTextMaskService
  ],
  exports: [
    TextMaskModule,
    DefaultTextMaskValidator,
    DefaultTextMaskEmptyCheckerWorker,
  ]
})
export class DefaultTextMaskModule { }
