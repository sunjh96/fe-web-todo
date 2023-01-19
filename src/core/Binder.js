import { typeCheck } from '@/utils';
import { Processor, BinderItem, ViewModel, ViewModelListener } from '@/core';

const Binder = class extends ViewModelListener {
  #items = new Set();
  #processors = {};
  rootViewModel;

  add(v, _ = typeCheck(v, BinderItem)) {
    this.#items.add(v);
  }

  addProcessor(v, _ = typeCheck(v, Processor)) {
    this.#processors[v.category] = v;
  }

  render(viewmodel, _ = typeCheck(viewmodel, ViewModel)) {
    const processores = Object.entries(this.#processors);

    this.#items.forEach(({ dataTypeValue, elem }) => {
      dataTypeValue = typeCheck(viewmodel[dataTypeValue], ViewModel);

      processores.forEach(([category, processor]) => {
        Object.entries(dataTypeValue[category]).forEach(([key, val]) => {
          processor.process(dataTypeValue, elem, key, val);
        });
      });
    });
  }

  watch(viewmodel, _ = typeCheck(viewmodel, ViewModel)) {
    this.rootViewModel = viewmodel;
    viewmodel.addListener(this);
    this.render(viewmodel);
  }

  unwatch(viewmodel, _ = typeCheck(viewmodel, ViewModel)) {
    viewmodel.removeListener(this);
  }

  viewmodelUpdated(updated) {
    const items = {};

    this.#items.forEach(({ vmName, el }) => {
      items[vmName] = [typeCheck(this.rootViewModel[vmName], ViewModel), el];
    });

    updated.forEach(({ subKey, category, k, v }) => {
      if (!items[subKey]) return;

      const [vm, el] = items[subKey];
      const processor = this.#processors[category];

      if (!el || !processor) return;

      processor.process(vm, el, k, v);
    });
  }
};

export default Binder;
