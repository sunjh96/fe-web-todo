import { getTaskList, setTaskCard, updateTaskCard } from '@/api/task';

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

  static addTaskCard(statusName, taskId, taskTitle, taskContent) {
    setTaskCard({ statusName, taskId, taskTitle, taskContent });
  }

  static modifyTaskCard(statusName = undefined, taskId = undefined, taskTitle = undefined, taskContent = undefined) {
    updateTaskCard({ statusName, taskId, taskTitle, taskContent });
  }

  static deleteTaskCard() {}
};

export default TaskModel;
