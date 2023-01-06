import Component from '../../core/Component.js';
import { Button } from './index.js';
import { TodoStatus } from '../index.js';
import { setStatus } from '../../store.js';

export default class Modal extends Component {
  setup() {
    this.state = {
      content: this.props.content,
      type: this.props.type,
    };
  }

  mounted() {
    let $button = this.$target.querySelector('[data-component=modal]');
    // $button = Array.prototype.filter.call($button, (el) => el.dataset.seq === parseInt(this.props.taskId));
    new Button($button, { content: '취소', className: 'btn-cancel', disabled: false, type: 'button' }, 'insertAdjacentHTML');
    new Button($button, { content: '등록', className: 'btn-ok', disabled: false, type: 'submit' }, 'insertAdjacentHTML');
  }

  setEvent() {
    const $target = document.querySelector('.todo-main');

    this.addEvent('submit', '[data-type=input]', (e) => {
      e.preventDefault();
      const titleInput = e.target['title'].value;

      document.querySelector('.modal-overlay').style.display = 'none';
      new TodoStatus($target, { status: titleInput, taskId: 0 }, 'insertAdjacentHTML');
      setStatus(titleInput);
      e.target['title'].value = '';
    });
  }

  template() {
    return `
    <section class="modal-overlay">
      <div class="modal-window">
        <p>${this.state.content}</p>
        <form data-type=${this.state.type}>
          ${this.state.type === 'input' && `<input type="text" name="title" placeholder="제목" required autofocus></input>`}
          <div data-component=modal class="button"></div>
        </form>
      </div>
    </section>`;
  }
}
