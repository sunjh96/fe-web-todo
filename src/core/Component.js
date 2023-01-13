/**
 * Class Component
 *
 * Class Todo와 Class Status와 Class Task에게 상속 해주는 클래스
 *
 * state를 통한 데이터관리
 * 하위 컴포넌트에게 state를 전달해주는 props
 * 화면을 렌더링해주는 render()
 * event를 핸들링하는 setEvent()
 * state 상태를 변경한 후 재렌더링하는 setState()
 * render 후 추가 동작을 위한 mounted()
 */
export default class Component {
  $target;
  props;
  state;
  innerType;
  counter = 0;

  constructor($target, props, innerType) {
    this.$target = $target;
    this.props = props;
    this.innerType = innerType;
    this.setup();
    this.render();
    this.setEvent();
  }

  setup() {}

  template() {
    return '';
  }

  mounted() {}

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template());
    this.mounted();
  }

  setEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) => children.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
}
