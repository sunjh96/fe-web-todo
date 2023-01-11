import Component from '@/core/Component';
import { Button } from '@/components/common';
import { TodoStatus, Task } from '@/components';
import { getUser, putTask } from '@/api/user';

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
        return getUser('jangoh').then((res) => {
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
    const { addTask, setTaskContent, updateTaskContent } = this;
    const _this = this;

    this.addEvent('click', '[data-status]', (e) => addTask(e, _this));
    this.addEvent('dblclick', '[data-task]', (e) => updateTaskContent(e));
    this.addEvent('submit', '[data-type=input-task]', (e) => setTaskContent(e));
    this.addEvent('click', '.add-status-btn', () => (document.querySelector('.modal-overlay').style.display = 'flex'));
  }

  async addTask(e, _this) {
    const taskCount = await _this.state.userInfo.then((res) => res.taskCount);
    const $statusTarget = e.target.closest('[data-status]');
    const $buttonTarget = e.target.closest('#add-task');
    const data = { title: '', content: '', loginedUser: 'jangoh', statusName: $statusTarget.dataset.status, taskId: taskCount + 1 };

    if ($buttonTarget) {
      new Task($statusTarget, { taskTitle: '', taskContent: '', taskAuthor: '', taskData: '', taskId: taskCount + 1 });
      await putTask(data);
    }
  }

  async setTaskContent(e) {
    e.preventDefault();

    const titleInput = e.target['title'].value;
    const contentInput = e.target['content'].value;
    const $statusTarget = e.target.closest('[data-status]');
    const $taskTarget = e.target.closest('[data-task]');

    const data = {
      title: titleInput,
      content: contentInput,
      loginedUser: 'jangoh',
      statusName: $statusTarget.dataset.status,
      taskId: $taskTarget.dataset.task,
    };
    await putTask(data);
    $taskTarget.dispatchEvent(new Event('dblclick'));
  }

  async updateTaskContent(e) {
    e.preventDefault();
    const $taskTarget = e.target.closest('[data-task]');
    const $titleTarget = $taskTarget.querySelector('.task-title-input');
    const $contentTarget = $taskTarget.querySelector('.task-content-input');

    // if (!$titleTarget.classList.contains('active')) {
    $titleTarget.classList.toggle('active');
    $contentTarget.classList.toggle('active');
    $taskTarget.querySelector('#delete-todo').classList.toggle('active');
    $taskTarget.querySelector('.task-author').classList.toggle('active');
    $taskTarget.querySelector('.button').classList.toggle('active');

    !$titleTarget.classList.contains('active') ? ($titleTarget.disabled = true) : ($titleTarget.disabled = false);
    !$contentTarget.classList.contains('active') ? ($contentTarget.disabled = true) : ($contentTarget.disabled = false);
    // }

    // await putTask({ loginedUser: 'jangoh', statusName: $statusTarget.dataset.status, taskId: $taskTarget.dataset.task });
  }
}
