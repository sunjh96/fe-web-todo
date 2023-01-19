import { getStatusList, setStatusList } from '@/api/status';

/**
 * @constructor
 * @summary
 */

const StatusModel = class {
  #statusData;

  constructor() {
    this.#statusData;
  }

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
