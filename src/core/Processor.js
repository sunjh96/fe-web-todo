import { typeCheck } from '@/utils';
import { ViewModel } from '@/core';

const Processor = class {
  constructor(category) {
    this.category = category;
    Object.freeze(this);
  }

  process(viewmodel, elem, key, val, _0 = typeCheck(viewmodel, ViewModel), _1 = typeCheck(elem, HTMLElement), _2 = typeCheck(key, 'string')) {
    this._process(viewmodel, elem, key, val);
  }
  _process(viewmodel, elem, key, val) {
    throw 'override';
  }
};

export default Processor;
