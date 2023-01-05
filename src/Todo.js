import Component from './core/Component.js';
import TodoStatus from './components/TodoStatus.js';
import Task from './components/Task.js';

export default class Todo extends Component {
  setup() {
    this.state = {
      status: [],
      taskId: 0,
    };
  }

  mounted() {
    new TodoStatus(this.$target, { status: '해야할일' });
  }

  setEvent() {
    const { addTask } = this;
    const _this = this;

    this.addEvent('click', '#add-todo', ({ target }) => {
      addTask(target.closest('[data-status]').dataset.status, _this);
      this.setState({
        taskId: this.state.taskId + 1,
      });
    });
  }

  addTask(status, _this) {
    const $taskTarget = _this.$target.querySelector(`[data-status=task-${status}]`);

    _this.appendComponent(new Task($taskTarget, { taskId: _this.state.taskId }, 'insertAdjacentHTML'));
  }

  deleteTask() {}
  filterTask() {}
}
const $target = document.querySelector('.todo-main');

const todo = new Todo($target);
todo.addTask.bind();
