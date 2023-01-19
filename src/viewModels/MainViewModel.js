import { typeCheck } from '@/utils';
import { Scanner, Processor, ViewModel } from '@/core';

const MainViewModel = class {
  constructor(target, _ = typeCheck(target, 'string')) {
    this.scanner = new Scanner();
    this.binder = this.scanner.scan(document.querySelector(target));
    this.bindProcessor();
  }

  test() {
    const { createViewModel } = this;

    const lists = createViewModel({
      lists: { data: 2 },
    });

    const rootViewModel = createViewModel({
      lists,
    });

    this.watchRootViewModel(rootViewModel);
  }

  bindProcessor() {
    this.binder.addProcessor(
      new (class extends Processor {
        _process(viewmodel, elem, key, val) {
          const a = elem.dataset;
          a.statusCount = val;
        }
      })('lists'),
    );

    this.binder.addProcessor(
      new (class extends Processor {
        _process(viewmodel, elem, key, val) {
          elem.style[key] = val;
        }
      })('styles'),
    );

    this.binder.addProcessor(
      new (class extends Processor {
        _process(viewmodel, elem, key, val) {
          elem.setAttribute(key, val);
        }
      })('attributes'),
    );

    this.binder.addProcessor(
      new (class extends Processor {
        _process(viewmodel, elem, key, val) {
          elem[key] = val;
        }
      })('properties'),
    );

    this.binder.addProcessor(
      new (class extends Processor {
        _process(viewmodel, elem, key, val) {
          elem.addEventListener(`${key}`, val(viewmodel));
        }
      })('events'),
    );
  }

  createViewModel(inLineData) {
    return ViewModel.get(inLineData);
  }

  watchRootViewModel(rootViewModel) {
    this.binder.watch(rootViewModel);
  }
};

export default MainViewModel;
