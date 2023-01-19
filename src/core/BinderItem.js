import { typeCheck } from '@/utils';

const BinderItem = class {
  constructor(elem, dataTypeValue, _0 = typeCheck(elem, HTMLElement), _1 = typeCheck(dataTypeValue, 'string')) {
    this.elem = elem;
    this.dataTypeValue = dataTypeValue;
    Object.freeze(this);
  }
};

export default BinderItem;
