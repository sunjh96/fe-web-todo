import { typeCheck } from '@/utils';
import { ViewModelValue, ViewModelSubject } from '@/core';

/**
 * @param {object} data - object type
 *
 * @summary  물리적인 View를 대신하여 순수한 메모리 객체로서의 View를 만들어내는 객체 (인메모리 객체)
 */
const ViewModel = class extends ViewModelSubject {
  static KEY = Symbol(); //모든 Key를 Observer에게 보고
  styles = {};
  attributes = {};
  properties = {};
  classLists = {};
  events = {};
  #subKey = '';
  #parent = null;

  constructor(data, _0 = typeCheck(data, 'object')) {
    super();
    this[ViewModel.KEY] = 'root';
    Object.entries(data).forEach(([k, v]) => this.define(this, k, v));
    Object.seal(this);
  }

  define(target, k, v) {
    if (v && typeof v == 'object' && !(v instanceof ViewModel)) {
      if (v instanceof Array) {
        target[k] = [];
        target[k][ViewModel.KEY] = `${target[ViewModel.KEY]}.${k}`; // 상대적인 경로 표기. key의 확장
        v.forEach((v, i) => this.define(target[k], i, v));
      } else {
        target[k] = { [ViewModel.KEY]: `${target[ViewModel.KEY]}.${k}` };
        Object.entries(v).forEach(([ik, iv]) => this.define(target[k], ik, iv));
      }

      Object.defineProperty(target[k], 'subKey', {
        get: () => target.subKey,
      });
    } else {
      if (v instanceof ViewModel) v._setParent(this, k);

      Object.defineProperties(target, {
        [k]: {
          enumerable: true,
          get: (_) => v,
          set: (newV) => {
            v = newV;
            this.add(new ViewModelValue(target.subKey, target[ViewModel.KEY], k, v));
          },
        },
      });
    }
  }

  static get(data) {
    return new ViewModel(data);
  }

  get subKey() {
    return this.#subKey;
  }

  get parent() {
    return this.#parent;
  }

  get notifyTarget() {
    return this;
  }

  _setParent(parent, subKey) {
    this.#parent = typeCheck(parent, ViewModel);
    this.#subKey = subKey;
    this.addListener(parent);
  }

  viewmodelUpdated(target, updated) {
    updated.forEach((v) => this.add(v));
  }
};

export default ViewModel;
