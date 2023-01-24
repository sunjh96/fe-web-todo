import drag from './drag';

export default function holdDownTask(e) {
  const PRESS_HOLD_DURATION = 150;

  const $taskTarget = e.target.closest('[data-task]');
  const $taskTargets = [...document.querySelectorAll('[data-task]')];
  const $eventFinishButtonTarget = document.querySelector('.finish-btn');
  const $triggerTargets = [...document.querySelectorAll('.trigger-line')];
  const pressHoldEvent = new CustomEvent('pressHold', { cancelable: true });

  let timerID, rotateID, setTimeoutID;
  let counter = 0;
  let rotateDir = 0;
  let dragCount = 0;

  $taskTarget.addEventListener('mouseup', notPressingDown);
  $taskTarget.addEventListener('pressHold', rotateX);
  $eventFinishButtonTarget.addEventListener('click', stopRotate);
  requestAnimationFrame(timer);

  function timer() {
    if (counter < PRESS_HOLD_DURATION) {
      timerID = requestAnimationFrame(timer);
      counter++;
    } else {
      $taskTarget.dispatchEvent(pressHoldEvent);
      $eventFinishButtonTarget.style.display = 'flex';
      $triggerTargets.forEach((elem) => (elem.style.display = 'none'));
    }
  }

  function pressingDown(e) {
    requestAnimationFrame(timer);
    e.preventDefault();
  }

  function notPressingDown() {
    cancelAnimationFrame(timerID);

    $taskTarget.removeEventListener('mousedown', pressingDown);
    $taskTarget.removeEventListener('mouseup', notPressingDown);
    $taskTarget.removeEventListener('pressHold', rotateX);

    counter = 0;
  }

  function rotateX() {
    $taskTargets.forEach((task) => {
      !dragCount && task.addEventListener('mousedown', drag);
      if (rotateDir === 0) {
        task.style.transform = `rotate(0deg)`;
      } else if (rotateDir === 1) {
        task.style.transform = `rotate(-0.7deg)`;
      } else {
        rotateDir = 0;
        task.style.transform = `rotate(0.7deg)`;
      }
    });

    dragCount++;

    setTimeoutID = setTimeout(() => {
      rotateDir += 1;
      rotateID = requestAnimationFrame(rotateX);
    }, 120);
  }

  function stopRotate() {
    cancelAnimationFrame(rotateID);
    clearTimeout(setTimeoutID);
    $taskTarget.removeEventListener('mousedown', drag);

    $eventFinishButtonTarget.style.display = 'none';
    $triggerTargets.forEach((elem) => (elem.style.display = 'block'));
  }
}
