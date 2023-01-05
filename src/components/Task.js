import Component from '../core/Component.js';
import Button from './common/Button.js';

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
      <input placeholder="제목을 입력하세요"></input>
      <input placeholder="내용을 입력하세요"></input>
      <div data-seq=${this.props.taskId} class="button"></div>
    </section>
    `;
  }

  mounted() {
    let $button = this.$target.querySelectorAll('.button');
    $button = Array.prototype.filter.call($button, (el) => parseInt(el.dataset.seq) === parseInt(this.props.taskId));

    new Button($button[0], { content: '취소', className: 'btn-cancel', disabled: false }, 'insertAdjacentHTML');
    new Button($button[0], { content: '등록', className: 'btn-ok', disabled: true }, 'insertAdjacentHTML');
  }
}
