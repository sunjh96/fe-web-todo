import { getTaskList, updateTaskCard } from '@/api/task';

/**
 * @constructor
 * @summary
 */

const TaskModel = class {
  #taskData;

  constructor() {
    this.#taskData;
  }

  async getTaskData() {
    this.#taskData = await getTaskList();

    return this.#taskData;
  }

  get taskData() {
    return (async () => {
      try {
        return await this.getTaskData();
      } catch (e) {
        throw `데이터 fetch 에러 => ${e} `;
      }
    })();
  }

  addTaskCard() {}
  deleteTaskCard() {}

  static modifyTaskCard(taskTitle, taskContent) {
    updateTaskCard();
  }
};

export default TaskModel;
