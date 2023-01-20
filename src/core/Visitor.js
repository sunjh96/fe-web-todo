import { typeCheck } from '@/utils';

/**
 * @param none
 *
 * @summary target이 HTML인지 JSON 객체인지 알 수없기 때문에 만든 추상 클래스
 */
const Visitor = class {
  visit(action, target, _0 = typeCheck(action, 'function')) {
    throw '상속 필요';
  }
};

export default Visitor;
