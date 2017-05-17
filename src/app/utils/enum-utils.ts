import {Type} from '@angular/core';

export class EnumUtils {

  private static indicesAndNames(OurEnum: Type<any>): any[] {
    return Object.keys(OurEnum)
      .map(key => OurEnum[key]);
  }

  static indices(OurEnum: Type<any>): number[] {
    return EnumUtils.indicesAndNames(OurEnum)
      .filter(value => typeof value === 'number');
  }

  static names(OurEnum: Type<any>): string[] {
    return EnumUtils.indicesAndNames(OurEnum)
      .filter(value => typeof value === 'string');
  }
}
