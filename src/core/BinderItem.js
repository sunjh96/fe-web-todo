import { typeCheck } from '@/utils';

/**
 * 
 * @param {HTMLElement} elem 
 * @param {string} dataTypeValue 
 * 
 * @summary data hook에 해당되는 이름인 viewModel과 해당 HTMLelement를 가지는 데이터만 가지는 객체
 */
const BinderItem = class {
  constructor(elem, dataTypeValue, _0 = typeCheck(elem, HTMLElement), _1 = typeCheck(dataTypeValue, 'string')) {
    this.elem = elem;
    this.dataTypeValue = dataTypeValue;
    Object.freeze(this);
  }
};

export default BinderItem;
