import Component from '@/core/Component';
import { Button } from '@/components/common';
import { getData, setData } from '@/store/store';
import TodoStatus from './TodoStatus';

export default class Todo extends Component {
  setup() {
    this.state = {
      status: getData('statusList'),
    };
  }

  template() {
    return `<div class="add-status-btn"></div>`;
  }

  mounted() {
    const $btnTarget = this.$target.querySelector('.add-status-btn');
    new Button($btnTarget, { className: 'new', disabled: false, content: '상태 추가', type: 'button' });

    //  prettier-ignore
    this.state.status
        .forEach((status) => new TodoStatus(this.$target, { status }, 'insertAdjacentHTML'));
  }

  setEvent() {
    const { addTask } = this;

    this.addEvent('click', '#add-todo', ({ target }) => {
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
