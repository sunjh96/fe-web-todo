import Component from '@/core/Component';
import { Button } from '@/components/common';
import { TodoStatus } from '@/components';
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

    this.addEvent('click', '#add-task', ({ target }) => {
      addTask(target.closest('[data-status]').dataset.status);
    });

    this.addEvent('click', '.add-status-btn', () => {
      document.querySelector('.modal-overlay').style.display = 'flex';
    });
  }

  async addTask(statusName) {
    const data = { title: '', content: '', loginedUser: 'jangoh', statusName };
    await putTask(data);
  }
}
