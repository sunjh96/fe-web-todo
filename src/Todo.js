import Component from './core/Component.js';
import { TodoStatus } from './components/index.js';
import { Button, Modal } from './components/common/index.js';
import { getTasks, setTasks, getStatus, setStatus } from './store.js';

export default class Todo extends Component {
  setup() {
    this.state = {
      status: getStatus(),
      taskId: 0,
    };
  }

  template() {
    return `<div class="add-status-btn"></div>`;
  }

  mounted() {
    const $btnTarget = this.$target.querySelector('.add-status-btn');
    const $statusList = document.querySelectorAll('main >[data-status]');
    new Button($btnTarget, { className: 'new', disabled: false, content: '상태 추가', type: 'button' });
    // new TodoStatus(this.$target, { status: node.dataset.status, taskId: this.state.taskId }, 'insertAdjacentHTML');

    //prettier-ignore
    Array.prototype
    .filter.call($statusList, (node) => !this.state.status.includes(node.dataset.status))
        .forEach((res) => console.log(res));
  }

  setEvent() {
    const { addTask } = this;

    this.addEvent('click', '#add-todo', ({ target }) => {
      this.setState({
        taskId: this.state.taskId + 1,
      });
      addTask(target.closest('[data-status]').dataset.status);
    });

    this.addEvent('click', '.add-status-btn', () => {
      document.querySelector('.modal-overlay').style.display = 'flex';
    });
  }

  addTask(status) {
    const taskId = getTasks('count');

    const data = { taskTitle: '', taskBody: '', taskAuthor: '', taskDate: new Date(), taskId: taskId };
    setTasks(status, data);
  }

  deleteTask() {}
  filterTask() {}
}

const $target = document.querySelector('.todo-main');

new Todo($target);
new Modal(document.body, { content: '추가 컬럼', type: 'input' }, 'insertAdjacentHTML');
