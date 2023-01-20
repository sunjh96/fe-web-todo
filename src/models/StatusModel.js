import { getStatusList, setStatusList } from '@/api/status';

/**
 * @param none
 *
 * @summary Firebase로부터 Status에 관한 데이터를 조회,수정,삭제하는 객체
 */
const StatusModel = class {
  #statusData;

  async setStatusData() {
    this.#statusData = await getStatusList();

    return this.#statusData;
  }

  get statusData() {
    return (async () => {
      try {
        return await this.setStatusData();
      } catch (e) {
        throw `데이터 fetch 에러 => ${e} `;
      }
    })();
  }

  addStatus() {}
  deleteStatus() {}
  modifyStatusName() {}
};

export default StatusModel;
