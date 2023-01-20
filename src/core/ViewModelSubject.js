import { typeCheck } from '@/utils';
import { ViewModelValue } from '@/core';
import ViewModelListener from './ViewModelListener.js';

const ViewModelSubject = class extends ViewModelListener {
  static #subjects = new Set();
  static #inited = false;
  #info = new Set();
  #listeners = new Set();

  static notify() {
    const f = () => {
      this.#subjects.forEach((vm) => {
        if (vm.#info.size) {
          vm.notify();
          vm.clear();
        }
      });

      if (this.#inited) requestAnimationFrame(f);
    };

    requestAnimationFrame(f);
  }

  static watch(vm, _ = typeCheck(vm, ViewModelListener)) {
    this.#subjects.add(vm);

    if (!this.#inited) {
      this.#inited = true;
      this.notify();
    }
  }

  static unwatch(vm, _ = typeCheck(vm, ViewModelListener)) {
    this.#subjects.delete(vm);

    if (!this.#subjects.size) this.#inited = false;
  }

  add(v, _ = typeCheck(v, ViewModelValue)) {
    this.#info.add(v);
  }

  clear() {
    this.#info.clear();
  }

  addListener(v, _ = typeCheck(v, ViewModelListener)) {
    this.#listeners.add(v);
    ViewModelSubject.watch(this);
  }

  removeListener(v, _ = typeCheck(v, ViewModelListener)) {
    this.#listeners.delete(v);
    if (!this.#listeners.size) ViewModelSubject.unwatch(this);
  }

  notify() {
    this.#listeners.forEach((v) => v.viewmodelUpdated(this.notifyTarget, this.#info));
  }

  get notifyTarget() {
    throw 'ViewModel에게 위임해야함';
  }
};

export default ViewModelSubject;
