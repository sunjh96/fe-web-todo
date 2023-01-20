import { typeCheck } from '@/utils';
import { Visitor } from '@/core';

/**
 * @param none
 *
 * @summary 구현 클래스 DomScanner의 추상 클래스
 */

const Scanner = class {
  #visitor;

  constructor(visitor, _ = typeCheck(visitor, Visitor)) {
    this.#visitor = visitor;
  }

  visit(f, target) {
    this.#visitor.visit(f, target);
  }

  scan(target) {
    throw `override`;
  }
};

export default Scanner;
