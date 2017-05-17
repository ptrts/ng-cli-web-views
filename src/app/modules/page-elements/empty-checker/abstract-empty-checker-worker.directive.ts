export abstract class AbstractEmptyCheckerWorker {

  // У всех кастомных чекеров приоритет должен быть большим, чтоб
  // они были приоритетнее тех, которые мы себе определили как стандартные:
  //    DefaultEmptyCheckerWorker - 1
  //    TextEmptyCheckerWorker - 2
  //    DefaultTextMaskEmptyCheckerWorker - 3
  readonly priority: number = 10;

  abstract extractEmptyState(): boolean;
}
