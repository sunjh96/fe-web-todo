import { typeCheck } from '@/utils';
// import { Binder, DomVisitor, DomScanner, Processor, ViewModel } from '@/core';
import ViewModel from '@/core/ViewModel.js';
import Binder from '@/core/Binder.js';
import DomVisitor from '@/core/DomVisitor.js';
import Processor from '@/core/Processor.js';
import DomScanner from '@/core/DomScanner.js';

const MainViewModel = class {
  rootViewModel;

  constructor(target, _0 = typeCheck(target, 'string')) {
    this.rootViewModel;
    this.visitor = new DomVisitor();
    this.scanner = new DomScanner(this.visitor);
    this.binder = typeCheck(this.scanner.scan(document.body), Binder);
    this.bindProcessor(this.visitor, this.scanner);
  }

  bindProcessor(visitor, scanner) {
    const processor = new (class extends Processor {
      _process(viewModel, elem, key, val) {
        elem.style[key] = val;
      }
    })('styles');

    processor
      .next(
        new (class extends Processor {
          _process(viewModel, elem, key, val) {
            elem.setAttribute(key, val);
          }
        })('attributes'),
      )
      .next(
        new (class extends Processor {
          _process(viewModel, elem, key, val) {
            elem[key] = val;
          }
        })('properties'),
      )
      .next(
        new (class extends Processor {
          _process(viewModel, elem, key, val) {
            elem.addEventListener(`${key}`, val(viewModel));
          }
        })('events'),
      )
      .next(
        new (class extends Processor {
          _process(viewModel, elem, key, val) {
            const { name = err('이름이 없습니다'), data = err('데이터가 없습니다') } = viewModel.template;
            const template = DomScanner.get(name) || err('에러 : ' + name);

            if (!(data instanceof Array)) err('에러 :' + data);

            data.forEach((viewModel, i) => {
              if (!(viewModel instanceof ViewModel)) err(`에레 : ${viewModel}`);
            });

            Object.freeze(data);

            visitor.visit((elem) => {
              if (elem.binder) {
                const [binder, viewModel] = elem.binder;
                binder.unwatch(viewModel);
                delete elem.binder;
              }
            }, elem);

            elem.innerHTML = '';
            data.forEach((viewModel) => {
              const child = template.cloneNode(true);
              const binder = scanner.scan(child);

              binder.processor = processor;
              elem.binders = [binder, viewModel];
              binder.watch(viewModel);
              elem.appendChild(child);
            });
          }
        })('template'),
      );

    this.binder.processor = processor;
  }

  createViewModel(inLineData) {
    return ViewModel.get(inLineData);
  }

  watchRootViewModel(rootViewModel) {
    this.binder.watch(rootViewModel);
  }
};

export default MainViewModel;
