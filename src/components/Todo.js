import Component from '@/core/Component';
import { Button } from '@/components/common';
import { TodoStatus, Task } from '@/components';
import { getUser, putTask } from '@/api/user';

export default class Todo extends Component {
  setup() {
    this.state = {
      userInfo: 0,
    };
  }

  template() {
    return `<div class="add-status-btn"></div>`;
  }

  async mounted() {
    const $btnTarget = this.$target.querySelector('.add-status-btn');
    const { status } = await getUser('jangoh');

    Object.keys(status).forEach((key) => new TodoStatus(this.$target, { status: key }, 'insertAdjacentHTML'));
    new Button($btnTarget, { className: 'add-status', disabled: false, content: '', type: 'button' });
  }

  setEvent() {
    const { addTask } = this;

    this.addEvent('click', '[data-status]', (e) => addTask(e));

    this.addEvent('click', '.add-status-btn', () => {
      document.querySelector('.modal-overlay').style.display = 'flex';
    });
  }

  async addTask(e) {
    const $statusTarget = e.target.closest('[data-status]');
    const data = { title: '', content: '', loginedUser: 'jangoh', statusName: $statusTarget.dataset.status };

    new Task($statusTarget, { taskId: 1, taskTitle: 'hi', taskContent: '', taskAuthor: '', taskData: '' }, 'insertAdjacentHTML');
    await putTask(data);
  }
}
