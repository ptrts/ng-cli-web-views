import {EnumUtils} from '../../../utils/enum-utils';
import {EnumValueModel} from './enum-value-model';

export class EnumValueModelUtils {
  static fromEnum(OurEnum: any): EnumValueModel[] {
    return EnumUtils.indices(OurEnum).map(i => new EnumValueModel(i, OurEnum[i]));
  }
}
