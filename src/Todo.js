import Component from './core/Component.js';
import TodoStatus from './components/TodoStatus.js';
import Task from './components/Task.js';
import { getTasks, setTasks } from './store.js';
export default class Todo extends Component {
  setup() {
    this.state = {
      status: [],
      taskId: 0,
    };
  }

  mounted() {
    new TodoStatus(this.$target, { status: '해야할일', taskId: this.state.taskId });
  }

  setEvent() {
    const { addTask } = this;

    this.addEvent('click', '#add-todo', ({ target }) => {
      this.setState({
        taskId: this.state.taskId + 1,
      });
      addTask(target.closest('[data-status]').dataset.status);
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
