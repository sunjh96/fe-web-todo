import Component from '@/core/Component';
import { Button } from '@/components/common';
import { getData } from '@/store/store';

export default class Task extends Component {
  setup() {
    this.state = {
      active: true,
      taskTitle: '',
      taskBody: '',
      taskAuthor: '',
      taskDate: new Date(),
    };
  }

  template() {
    return `
    <section class="todo-task">
      <form>
        <input placeholder="제목을 입력하세요" required autofocus></input>
        <input placeholder="내용을 입력하세요" required></input>
        <div data-seq=${this.props.taskId} class="button"></div>
      </form>
    </section>
    `;
  }

  mounted() {
    let $button = this.$target.querySelectorAll('.button');
    $button = Array.prototype.filter.call($button, (el) => parseInt(el.dataset.seq) === parseInt(this.props.taskId));

    new Button($button[0], { content: '취소', className: 'btn-cancel', disabled: false, type: 'button' }, 'insertAdjacentHTML');
    new Button($button[0], { content: '등록', className: 'btn-ok', disabled: true, type: 'submit' }, 'insertAdjacentHTML');
  }
}
