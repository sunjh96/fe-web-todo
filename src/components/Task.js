import Component from '@/core/Component';
import { Button } from '@/components/common';

/**
 * Class Task
 * Class Component 와 상속연결
 *
 * Task의 기본정보를 props로 전달받아 화면에 보여주는 View Component
 */
export default class Task extends Component {
  setup() {
    this.state = {
      taskId: this.props.taskId,
      taskTitle: this.props.taskTitle,
      taskContent: this.props.taskContent,
      taskAuthor: this.props.taskAuthor,
      taskDate: this.props.taskDate,
    };
  }

  template() {
    return `
    <section class="todo-task" data-task=${this.state.taskId}>
      <form data-type="input-task">
        <div class="task-title">
          <textarea class="task-title-input active" placeholder="제목을 입력하세요" name="title" rows="1" required autofocus>${this.state.taskTitle}</textarea>
          <span id="delete-todo" class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 12" fill="none">
              <path
                d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                fill="#BDBDBD"
              />
            </svg>
          </span>
        </div>
        <textarea class="task-content-input active" placeholder="내용을 입력하세요" name="content" rows="1" required>${this.state.taskContent}</textarea>
        <span class="task-author active">author by ${this.state.taskAuthor}</span>
        <div data-seq=${this.state.taskId} class="button"></div>
      </form>
    </section>
    `;
  }

  mounted() {
    let $buttonTarget = this.$target.querySelectorAll('.button');
    $buttonTarget = Array.prototype.filter.call($buttonTarget, (el) => parseInt(el.dataset.seq) === parseInt(this.state.taskId));

    new Button($buttonTarget[0], { content: '취소', className: 'btn-cancel', disabled: false, type: 'button' });
    new Button($buttonTarget[0], { content: '등록', className: 'btn-ok', disabled: false, type: 'submit' });
  }
}
