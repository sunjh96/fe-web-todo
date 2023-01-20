import { typeCheck } from '@/utils';
import { ViewModel } from '@/core';

const Processor = class {
  #category;
  #next = null;

  constructor(category) {
    this.#category = category;
    Object.freeze(this);
  }

  process(
    category,
    viewModel,
    elem,
    key,
    val,
    _0 = typeCheck(viewModel, ViewModel),
    _1 = typeCheck(elem, HTMLElement),
    _2 = typeCheck(key, 'string'),
  ) {
    if (this.#category === category) this._process(viewModel, elem, key, val);
    if (this.#next !== null) this.#next.process(category, viewModel, elem, key, val);
  }

  _process(viewModel, elem, key, val) {
    throw '상속 X';
  }

  next(processor) {
    this.#next = processor;

    return processor;
  }
};

export default Processor;
