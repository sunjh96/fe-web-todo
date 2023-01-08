import Component from '@/core/Component';
import { Button } from '@/components/common';
import { TodoStatus } from '@/components';
import { getData, setData } from '@/store/store';
import { getUser, createUser } from '@/api/user';
import client from '../api/client';

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
    let userData;
    const $btnTarget = this.$target.querySelector('.add-status-btn');
    await getUser('jangoh').then((res) => (userData = res));
    const { status } = userData;

    status.forEach((obj) => new TodoStatus(this.$target, { status: Object.keys(obj)[0] }, 'insertAdjacentHTML'));
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

  addTask(status) {
    const data = { taskTitle: '', taskBody: '', taskAuthor: '', taskDate: new Date(), taskId: getData('countTask') };
    setData('countTask');
    setData(status, data);
  }
}
