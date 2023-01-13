import Component from '@/core/Component';
import { Task } from '@/components';

/**
 * Class TodoStatus
 * Class Component 와 상속연결
 * Class Task 와 의존연결
 *
 * TodoStatus에 필요한 기본정보를 props로 전달받아 화면에 보여주는 View Component
 */
export default class TodoStatus extends Component {
  setup() {
    this.state = {
      title: this.props.statusTitle,
      taskList: this.props.taskList,
    };
  }

  async mounted() {
    const taskDatas = await this.state.taskList;
    const $taskTarget = this.$target.querySelector(`[data-status=${this.state.title}task-list]`);

    taskDatas.forEach((obj) => {
      const props = {
        taskId: obj.taskId,
        taskTitle: obj.title,
        taskContent: obj.content,
        taskAuthor: obj.author,
        taskDate: obj.date,
        taskActive: obj.taskActive,
      };

      new Task($taskTarget, props);
    });
  }

  async template() {
    const countTasks = await this.state.taskList;

    return `
      <article class="todo-article" data-status=${this.state.title}>
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
            <span id="delete-status">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                  fill="#BDBDBD"
                />
              </svg>
            </span>
          </div>
        </section>
        <section data-status="${this.state.title}task-list" class="todo-task-list"></section>
      </article>
    `;
  }
  async render() {
    this.$target.insertAdjacentHTML('beforeend', await this.template());
    this.mounted();
  }
}
