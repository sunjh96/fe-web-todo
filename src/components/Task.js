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
      taskActive: this.props.taskActive,
    };
  }

  template() {
    return `
    <section class="todo-task ${this.state.taskActive ? 'active-bg' : ''}" data-task=${this.state.taskId}>
      <form data-type="input-task">
        <div class="task-title">
          <textarea class="task-title-input ${
            this.state.taskActive ? 'active' : ''
          }" placeholder="제목을 입력하세요" name="title" rows="1" required autofocus ${this.state.taskActive ? '' : 'disabled'} value="${
      this.state.taskTitle
    }">${this.state.taskTitle}</textarea>
          ${
            this.state.taskActive
              ? ''
              : `<svg class="edit-button" xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                  <path
                    d="M13.7619 2.8366L11.2012 0.262865C11.032 0.0945094 10.803 0 10.5643 0C10.3256 0 10.0967 0.0945094 9.92745 0.262865L0.849572 9.32765L0.0207413 12.9047C-0.00785061 13.0355 -0.00687046 13.171 0.02361 13.3013C0.0540905 13.4316 0.113301 13.5535 0.196917 13.658C0.280533 13.7626 0.386441 13.8471 0.506905 13.9054C0.62737 13.9638 0.759346 13.9945 0.893194 13.9953C0.955562 14.0016 1.0184 14.0016 1.08077 13.9953L4.69709 13.1664L13.7619 4.11038C13.9302 3.94117 14.0247 3.71219 14.0247 3.47349C14.0247 3.2348 13.9302 3.00581 13.7619 2.8366ZM4.26086 12.3812L0.871383 13.0923L1.6435 9.76824L8.43555 3.00237L11.0529 5.61973L4.26086 12.3812ZM11.6375 4.9872L9.02009 2.36984L10.5382 0.860495L13.1119 3.47785L11.6375 4.9872Z"
                    fill="#010101"
                  />
                </svg>`
          }
          <span id="delete-todo" class=${this.state.taskActive ? 'active' : ''}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 12" fill="none">
              <path
                d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                fill="#BDBDBD"
              />
            </svg>
          </span>
        </div>
        <textarea class="task-content-input ${
          this.state.taskActive ? 'active' : ''
        }" placeholder="내용을 입력하세요" name="content" rows="1" required ${this.state.taskActive ? '' : 'disabled'} value="${
      this.state.taskContent
    }">${this.state.taskContent}</textarea>
        <span class="task-author ${this.state.taskActive ? 'active' : ''}">author by ${this.state.taskAuthor}</span>
        <div data-seq=${this.state.taskId} class="button ${this.state.taskActive ? '' : 'active'}"></div>
      </form>
    </section>
    `;
  }

  mounted() {
    const isDisabled = !(this.state.taskTitle && this.state.taskContent);
    let $buttonTarget = this.$target.querySelectorAll('.button');
    $buttonTarget = Array.prototype.filter.call($buttonTarget, (el) => parseInt(el.dataset.seq) === parseInt(this.state.taskId));

    new Button($buttonTarget[0], { content: '취소', className: 'cancel-button', disabled: false, type: 'button' });
    new Button($buttonTarget[0], { content: '등록', className: 'submit-button', disabled: false, type: 'submit' });
  }
}
