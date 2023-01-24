import { typeCheck } from '@/utils';
import ViewModel from '@/core/ViewModel.js';
import Binder from '@/core/Binder.js';
import DomVisitor from '@/core/DomVisitor.js';
import Processor from '@/core/Processor.js';
import DomScanner from '@/core/DomScanner.js';

/**
 * @param {HTMLElment} target - HTMLElment Type, scan을 시작 할 Element

 * @returns binding을 완료한 binder
 */

export default function bindProcessor(target, _0 = typeCheck(target, 'string')) {
  const visitor = new DomVisitor();
  const scanner = new DomScanner(visitor);
  const binder = typeCheck(scanner.scan(document.querySelector(target)), Binder);

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
          elem.classList[key](val);
        }
      })('classLists'),
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
          const err = (v) => {
            throw v;
          };
          const { name = err('이름이 없습니다'), data = err('데이터가 없습니다') } = viewModel.template;
          const template = DomScanner.get(name) || err('name에러 : ' + name);

          if (!(data instanceof Array)) err('data에러 :' + data);

          data.forEach((viewModel) => {
            if (!(viewModel instanceof ViewModel)) err(`viewModel에러 : ${viewModel}`);
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

  binder.processor = processor;

  return binder;
}
