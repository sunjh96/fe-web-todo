import { typeCheck } from '@/utils';
import { Scanner, Binder, BinderItem, DomVisitor } from '@/core';

/**
 * @param {DomVisitor} visitor - DomVisitor 객체
 *
 * @summary 추상 클래스 Scanner의 구현 클래스이며 전달받은 target이 설정한 data-type과 맞는 것들을 바인딩 하는 클래스
 */
const DomScanner = class extends Scanner {
  static #templates = new Map();

  constructor(visitor, _ = typeCheck(visitor, DomVisitor)) {
    super(visitor);
  }

  static get(key) {
    return this.#templates.get(key);
  }

  scan(target, _0 = typeCheck(target, HTMLElement)) {
    const binder = new Binder();

    const checkDataType = (elem) => {
      const template = elem.getAttribute('data-template');

      if (template) {
        elem.removeAttribute('data-template');
        DomScanner.#templates.set(template, elem);
        elem.parentElement.removeChild(elem);
      } else {
        const targetElement = elem.getAttribute('data-viewmodel');

        if (targetElement) {
          // elem.removeAttribute('data-viewmodel');
          binder.add(new BinderItem(elem, targetElement));
        }
      }
    };

    checkDataType(target);
    this.visit(checkDataType, target);

    return binder;
  }
};

export default DomScanner;
