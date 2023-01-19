import { typeCheck } from '@/utils';
import { ViewModelValue } from '@/core';
// import { ViewModelValue, ViewModelListener } from '@/core';
import ViewModelListener from './ViewModelListener.js';

const ViewModel = class extends ViewModelListener {
  static #subjects = new Set();
  static #inited = false;

  subKey = '';
  parent = null;
  styles = {};
  attributes = {};
  properties = {};
  events = {};
  lists = {};
  #isUpdated = new Set();
  #listeners = new Set();

  constructor(data, _ = typeCheck(data, 'object')) {
    super();

    Object.entries(data).forEach(([k, v]) => {
      if ('styles,attributes,properties'.includes(k)) {
        if (!v || typeof v != 'object') throw `invalid object k: ${k}, v:${v}`;
        this[k] = ViewModel.define(this, k, v);
      } else {
        Object.defineProperty(this, k, ViewModel.descriptor(this, '', k, v));
        if (v instanceof ViewModel) {
          v.parent = this;
          v.subKey = k;
          v.addListener(this);
        }
      }
    });

    ViewModel.notify(this);
    Object.seal(this);
  }

  static get = (data) => new ViewModel(data);

  static notify(vm) {
    this.#subjects.add(vm);

    if (this.#inited) return;

    this.#inited = true;

    const f = () => {
      this.#subjects.forEach((vm) => {
        if (vm.#isUpdated.size) {
          vm.notify();
          vm.#isUpdated.clear();
        }
      });
      requestAnimationFrame(f);
    };

    requestAnimationFrame(f);
  }

  static descriptor = (vm, category, k, v) => ({
    enumerable: true,
    get: () => v,
    set(newV) {
      v = newV;
      vm.#isUpdated.add(new ViewModelValue(vm.subKey, category, k, v));
    },
  });

  static define = (vm, category, obj) =>
    Object.defineProperties(
      obj,
      Object.entries(obj).reduce((r, [k, v]) => ((r[k] = ViewModel.descriptor(vm, category, k, v)), r), {}),
    );

  viewmodelUpdated(updated) {
    updated.forEach((v) => this.#isUpdated.add(v));
  }
  addListener(v, _ = typeCheck(v, ViewModelListener)) {
    this.#listeners.add(v);
  }
  removeListener(v, _ = typeCheck(v, ViewModelListener)) {
    this.#listeners.delete(v);
  }
  notify() {
    this.#listeners.forEach((v) => v.viewmodelUpdated(this.#isUpdated));
  }
};

export default ViewModel;
