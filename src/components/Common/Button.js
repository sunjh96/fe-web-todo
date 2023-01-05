import Component from '../../core/Component.js';

export default class Button extends Component {
  setup() {
    this.state = {
      disable: this.props.disabled,
      content: this.props.content,
    };
  }

  template() {
    return `<button class="${this.props.className}" disabled=${this.state.disable}>${this.state.content}</button>`;
  }

  setEvent() {}
}
