/**
 * @param none
 *
 * @summary 변화의 감지에 대한 내용을 수신하는 객체
 */

const ViewModelListener = class {
  viewmodelUpdated(updated) {
    throw '상속 필요';
  }
};

export default ViewModelListener;
