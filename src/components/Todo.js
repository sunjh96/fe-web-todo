import { Component, holdDownTask } from '@/core';
import { Button } from '@/components/common';
import { TodoStatus, Task } from '@/components';
import { getUserInfo, putTask, deleteTask, deleteStatus } from '@/api/forMission/user';

/**
 * Class Todo
 * Class Component 와 상속연결
 * Class TodoStatus 와 의존연결
 *
 * Status와 Task를 생성, 삭제, 수정 가능하게 이벤트를 위임받았으며 전체 페이지 뷰를 담당하는 클래스
 */
export default class Todo extends Component {
  setup() {
    this.state = {
      userInfo: (() => {
        return getUserInfo('jangoh').then((res) => {
          return res;
        });
      })(),
    };
  }

  template() {
    return `<div class="add-status-btn"></div>`;
  }

  async mounted() {
    const $btnTarget = this.$target.querySelector('.add-status-btn');
    const { status } = await this.state.userInfo;

    Object.entries(status).forEach(([key, val]) => {
      new TodoStatus(this.$target, { statusTitle: key, taskList: val });
    });
    new Button($btnTarget, { className: 'add-status', disabled: false, content: '', type: 'button' });
  }

  setEvent() {
    const { addTask, deleteTask, deleteStatus, setTaskContent, openModal } = this;

    this.addEvent('mousedown', '[data-task]', holdDownTask);
    this.addEvent('click', '.edit-button', setTaskContent);
    this.addEvent('click', '#delete-todo', deleteTask);
    this.addEvent('click', '#delete-status', deleteStatus);
    this.addEvent('click', '[data-status]', addTask.bind(this));
    this.addEvent('dblclick', '[data-task]', setTaskContent);
    this.addEvent('submit', '[data-type=input-task]', setTaskContent);
    this.addEvent('click', '.add-status-btn', openModal);
  }

  openModal() {
    document.querySelector('.modal-overlay').style.display = 'flex';
  }

  async addTask(e) {
    const taskCount = await this.state.userInfo.then((res) => res.taskCount);
    const $statusTarget = e.target.closest('[data-status]');
    const $buttonTarget = e.target.closest('#add-task');
    const data = { title: '', content: '', loginedUser: 'jangoh', statusName: $statusTarget.dataset.status, taskId: taskCount + 1, taskActive: true };

    if ($buttonTarget) {
      new Task($statusTarget, {
        taskTitle: '',
        taskContent: '',
        taskAuthor: '',
        taskData: '',
        taskId: taskCount + 1,
        taskActive: true,
      });

      await putTask(data);
    }
  }

  async setTaskContent(e) {
    e.preventDefault();

    const statusName = e.target.closest('[data-status]').dataset.status.split('task-list')[0];
    const $taskTarget = e.target.closest('[data-task]');
    const taskId = $taskTarget.dataset.task;

    let data = { loginedUser: 'jangoh', statusName, taskId: parseInt(taskId) };

    if (e.type === 'dblclick' || e.target.closest('.edit-button')) {
      data = { ...data, taskActive: true };
    } else {
      const taskTitleInput = e.target['title'].value;
      const taskcontentInput = e.target['content'].value;

      data = { ...data, title: taskTitleInput, content: taskcontentInput, taskActive: false };
    }

    await putTask(data);
  }

  deleteTask({ target }) {
    const statusName = target.closest('[data-status]').dataset.status.split('task-list')[0];
    const $taskTarget = target.closest('[data-task]');
    const taskId = $taskTarget.dataset.task;

    deleteTask({ statusName, taskId, loginedUser: 'jangoh' });
  }

  deleteStatus({ target }) {
    const statusName = target.closest('[data-status]').dataset.status.split('task-list')[0];

    deleteStatus({ statusName, loginedUser: 'jangoh' });
  }
}
