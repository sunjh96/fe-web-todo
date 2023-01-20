import { typeCheck } from '@/utils';
import { Visitor } from '@/core';

/**
 * @param {function} action - 전달받은 함수
 * @param {HTMLElement} startTarget - 탐색 시작할 Element
 *
 * @summary startTarget 지점으로부터 DOM Tree를 순회하는 객체
 */
const DomVisitor = class extends Visitor {
  visit(action, startTarget, _0 = typeCheck(action, 'function'), _1 = typeCheck(startTarget, HTMLElement)) {
    const stack = [];
    let curr = startTarget.firstElementChild;

    if (!curr) return;

    do {
      action(curr);
      if (curr.firstElementChild) stack.push(curr.firstElementChild);
      if (curr.nextElementSibling) stack.push(curr.nextElementSibling);
    } while ((curr = stack.pop()));
  }
};

export default DomVisitor;
