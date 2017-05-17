import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultEmptyCheckerWorker} from './default-empty-checker-worker.directive';
import {GroupEmptyChecker} from './group-empty-checker.directive';
import {LeafEmptyChecker} from './leaf-empty-checker.directive';
import {TextEmptyCheckerWorker} from './text-empty-checker-worker.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GroupEmptyChecker,
    LeafEmptyChecker,
    DefaultEmptyCheckerWorker,
    TextEmptyCheckerWorker,
  ],
  exports: [
    GroupEmptyChecker,
    LeafEmptyChecker,
    DefaultEmptyCheckerWorker,
    TextEmptyCheckerWorker,
  ]
})
export class EmptyCheckerModule { }
