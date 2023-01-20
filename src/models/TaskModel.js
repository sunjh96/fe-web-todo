import { getTaskList } from '@/api/task';

/**
 * @constructor
 * @summary
 */

const TaskModel = class {
  #taskData;

  constructor() {
    this.#taskData;
  }

  async setTaskData() {
    this.#taskData = await getTaskList();

    return this.#taskData;
  }

  get taskData() {
    return (async () => {
      try {
        return await this.setTaskData();
      } catch (e) {
        throw `데이터 fetch 에러 => ${e} `;
      }
    })();
  }

  addTask() {}
  deleteTask() {}
  modifyTaskName() {}
};

export default TaskModel;
