import {Directive, ElementRef, forwardRef, Inject, InjectionToken, OnInit, Optional, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import {AbstractEmptyCheckerWorker} from './abstract-empty-checker-worker.directive';
import {AbstractEmptyChecker} from './abstract-empty-checker';
import {EmptyCheckerGroup} from './group-empty-checker.directive';

export const APP_EMPTY_CHECKER_WORKERS = new InjectionToken('APP_EMPTY_CHECKER_WORKERS');

@Directive({
  selector: '[ngModel],[formControl],[formControlName]',
  exportAs: 'emptyChecker',
  providers: [
    {
      provide: AbstractEmptyChecker,
      useExisting: forwardRef(() => LeafEmptyChecker)
    }
  ]
})
export class LeafEmptyChecker extends AbstractEmptyChecker implements OnInit {

  private worker: AbstractEmptyCheckerWorker;

  constructor(elementRef: ElementRef,
              ngControl: NgControl,
              @Optional() parentGroup: EmptyCheckerGroup,
              @Inject(APP_EMPTY_CHECKER_WORKERS) @Self() private emptyCheckers: AbstractEmptyCheckerWorker[]) {

    super(elementRef, ngControl, parentGroup);
  }

  ngOnInit(): void {

    this.chooseWorker();
    this.bindToEvents();

    // console.log('Обновление empty непосредственно в ngOnInit()');
    this.extractAndPushNewEmpty();

    super.ngOnInit();
  }

  private chooseWorker() {

    // У кого приоритет меньше, тот пойдет первым
    // Сначала дефолтные, а потом кастомные
    let sortedEmptyCheckers = this.emptyCheckers.sort((a, b) => a.priority - b.priority);

    if (sortedEmptyCheckers.length > 0) {

      // Разносим все EmptyChecker по группам.
      // В каждой группе лежат EmptyChecker с одинаковым значением priority
      let priorityGroups: Array<Array<AbstractEmptyCheckerWorker>> = [];
      let currentPriority = -1;
      let currentPriorityGroup: Array<AbstractEmptyCheckerWorker>;
      sortedEmptyCheckers.forEach(emptyChecker => {
        if (emptyChecker.priority !== currentPriority) {
          currentPriorityGroup = [];
          priorityGroups.push(currentPriorityGroup);
        }
        currentPriorityGroup.push(emptyChecker);
      });

      // Проверяем группы EmptyChecker с одинаковым приоритетом.
      // В каждой группе должно быть по одному элементу.
      // Если это не так - выбрасываем исключение
      priorityGroups.forEach(group => {
        if (group.length > 1) {
          throw new Error(
            `На элементе ${this.controlDirective.path}, обнаружено ${group.length} 
             EmptyChecker с одинаковым приоритетом ${group[0].priority}. 
             На одном элементе каждого приоритета должно быть не больше одного.`
          );
        }
      });

      // Берем единственный элемент из последней группы.
      // Это EmptyChecker, у которого приоритет самый большой.
      let lastGroup = priorityGroups[priorityGroups.length - 1];
      this.worker = lastGroup[0];
    }
  }

  private bindToEvents() {

    const that = this;

    /*this.element.addEventListener('input', () => {
      console.log('Обновление empty по событию input');
      that.extractAndPushNewEmpty();
    });*/

    if (this.controlDirective) {
      this.controlDirective.valueChanges.subscribe(() => {
        console.log('Обновление empty по событию от NgControl');
        that.extractAndPushNewEmpty();
      });
    }
  }

  private extractAndPushNewEmpty() {
    let newEmpty = this.worker.extractEmptyState();
    this.onNewEmpty(newEmpty);
  }
}
