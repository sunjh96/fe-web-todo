import { typeCheck } from '@/utils';
import { BinderItem, ViewModel, ViewModelListener } from '@/core';

/**
 * @param none
 *
 * @summary ViewModel을 감지하여 View에 반영함으로써 View에 대한 제어는 Binder에게 위임
 */

const Binder = class extends ViewModelListener {
  #items = new Set();
  #processor = null;

  set processor(binderItem) {
    this.#processor = binderItem;
  }

  render(viewmodel, _ = typeCheck(viewmodel, ViewModel)) {
    this.#items.forEach(({ dataTypeValue, elem }) => {
      const viewModel = typeCheck(viewmodel[dataTypeValue], ViewModel);

      Object.entries(viewModel).forEach(([category, childViewModel]) => {
        Object.entries(childViewModel).forEach(([key, val]) => {
          this.#processor.process(category, viewModel, elem, key, val);
        });
      });
    });
  }

  add(binderItem, _0 = typeCheck(binderItem, BinderItem)) {
    this.#items.add(binderItem);
  }

  watch(viewmodel, _0 = typeCheck(viewmodel, ViewModel)) {
    viewmodel.addListener(this);
    this.render(viewmodel);
  }

  unwatch(viewmodel, _0 = typeCheck(viewmodel, ViewModel)) {
    viewmodel.removeListener(this);
  }

  viewmodelUpdated(target, updated, _0 = typeCheck(target, ViewModel)) {
    const items = {};

    this.#items.forEach(({ dataTypeValue, elem }) => {
      items[dataTypeValue] = [typeCheck(target[dataTypeValue], ViewModel), elem];
    });

    updated.forEach(({ subKey, category, key, val }) => {
      if (!items[subKey]) return;

      const [dataTypeValue, elem] = items[subKey];
      const processor = this.#processor;

      if (!elem || !processor) return;

      processor.process(category.split('.').pop(), dataTypeValue, elem, key, val);
    });
  }
};

export default Binder;
