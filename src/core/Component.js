export default class Component {
  $target;
  props;
  state;
  innerType;

  constructor($target, props, innerType) {
    this.$target = $target;
    this.props = props;
    this.innerType = innerType;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}

  template() {
    return '';
  }

  mounted() {}

  render() {
    this.innerType === 'insertAdjacentHTML'
      ? this.$target.insertAdjacentHTML('beforeend', this.template())
      : (this.$target.innerHTML = this.template());

    this.mounted();
  }

  setEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
}
