import Component from '../../../core/Component.js';

export default class Task extends Component {
  setup() {
    this.state = {
      active: false,
      taskTitle: '',
      taskBody: '',
      taskAuthor: '',
      taskSeq: 0,
    };
  }

  template() {
    return `
    <section data-seq=${this.taskSeq}>
      ${this.active ? <p>{this.taskTitle}</p> : <input></input>}
      ${this.active ? <p>{this.taskBody}</p> : <input></input>}
      ${this.active ? <p>{this.taskAuthor}</p> : <div></div>}
    </section>
    `;
  }

  setEvent() {}
}
