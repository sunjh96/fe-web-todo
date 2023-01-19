import { typeCheck } from '@/utils';
import { Binder, BinderItem } from '@/core';

/**
 * @constructor none
 * @summary DOM Tree를 순회하면서 Scan 하여 Binding 하는 역할
 */

const Scanner = class {
  scan(elem, _ = typeCheck(elem, HTMLElement)) {
    const binder = new Binder();
    this.checkItem(binder, elem);

    const stack = [elem.firstElementChild];
    let target;

    while ((target = stack.pop())) {
      this.checkItem(binder, target);
      if (target.firstElementChild) stack.push(target.firstElementChild);
      if (target.nextElementSibling) stack.push(target.nextElementSibling);
    }

    return binder;
  }

  checkItem(binder, elem) {
    const dataTypeValue = elem.getAttribute('data-viewmodel');

    if (dataTypeValue) binder.add(new BinderItem(elem, dataTypeValue));
  }
};

export default Scanner;
