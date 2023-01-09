import Component from '@/core/Component';
import { Task } from '@/components';
import { getStatusTasks, putTask } from '@/api/user';

export default class TodoStatus extends Component {
  setup() {
    this.state = {
      title: this.props.status,
      taskList: (() => {
        return getStatusTasks('jangoh', this.props.status).then((res) => {
          return res;
        });
      })(),
    };
  }

  async mounted() {
    const taskData = await this.state.taskList;
    const $taskTarget = this.$target.querySelector(`[data-status=task-${this.props.status}]`);

    taskData.forEach((obj, idx) => {
      new Task(
        $taskTarget,
        { taskId: idx, taskTitle: obj.title, taskContent: obj.content, taskAuthor: obj.author, taskData: obj.date },
        'insertAdjacentHTML',
      );
    });
  }

  setEvent() {
    this.addEvent('submit', '[data-type=input-task]', async (e) => {
      e.preventDefault();
      const titleInput = e.target['title'].value;
      const contentInput = e.target['content'].value;
      const data = { title: titleInput, content: contentInput, loginedUser: 'jangoh', statusName: this.state.title };

      if (e.target && ParseInt(e.target.parentNode.dataset.taskid) === 10) {
        await putTask(data);
      }
    });
  }

  async template() {
    const countTasks = await this.state.taskList;

    return `
      <article class="todo-article" data-status=${this.props.status}>
        <section class="todo-header">
          <div class="todo-title">
            <h3>${this.state.title}</h3>
            <div>${countTasks.length ?? 0}</div>
          </div>
          <div class="todo-svg">
            <span id="add-task">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 14 14" fill="none">
                <path
                  d="M0.105713 7.53033L0.105713 6.46967H6.46967V0.105713H7.53033V6.46967H13.8943V7.53033H7.53033V13.8943H6.46967V7.53033H0.105713Z"
                  fill="#BDBDBD"
                />
              </svg>
            </span>
            <span id="delete-todo">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                  fill="#BDBDBD"
                />
              </svg>
            </span>
          </div>
        </section>
        <section data-status=task-${this.props.status} class="todo-task-list"></section>
      </article>
    `;
  }

  async render() {
    this.innerType === 'insertAdjacentHTML'
      ? this.$target.insertAdjacentHTML('beforeend', await this.template())
      : (this.$target.innerHTML = await this.template());

    this.mounted();
  }
}
