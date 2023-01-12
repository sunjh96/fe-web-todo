export function drag(event, elementToDrag = event.target) {
  elementToDrag = elementToDrag.closest('[data-task]');
  elementToDrag.style.position = 'absolute';
  elementToDrag.style.zIndex = '100';

  let startX = event.clientX;
  let startY = event.clientY;

  let origX = elementToDrag.offsetLeft;
  let origY = elementToDrag.offsetTop;

  let deltaX = startX - origX;
  let deltaY = startY - origY;

  document.addEventListener('mousemove', moveHandler, true);
  document.addEventListener('mouseup', upHandler, true);

  event.stopPropagation();
  event.preventDefault();

  function moveHandler(e) {
    elementToDrag.style.left = e.clientX - deltaX + 'px';
    elementToDrag.style.top = e.clientY - deltaY + 'px';

    e.stopPropagation();
  }

  function upHandler(e) {
    document.removeEventListener('mouseup', upHandler, true);
    document.removeEventListener('mousemove', moveHandler, true);

    e.stopPropagation();
  }
}

export function holdDownTask(e) {
  const PRESS_HOLD_DURATION = 200;
  let $taskTarget = e.target.closest('[data-task]');
  let $taskTargets = [...document.querySelectorAll('[data-task]')];
  let timerID, rotateTaskID;
  let counter = 0;
  let x = 0;

  let pressHoldEvent = new CustomEvent('pressHold');

  $taskTarget.addEventListener('mousedown', pressingDown);
  $taskTarget.addEventListener('mouseup', notPressingDown);
  $taskTarget.addEventListener('mouseleave', notPressingDown);
  $taskTarget.addEventListener('pressHold', rotateX);

  function timer() {
    if (counter < PRESS_HOLD_DURATION) {
      timerID = requestAnimationFrame(timer);
      counter++;
    } else {
      $taskTarget.dispatchEvent(pressHoldEvent);
    }
  }

  function pressingDown(e) {
    requestAnimationFrame(timer);
    e.preventDefault();
  }

  function notPressingDown(e) {
    cancelAnimationFrame(timerID);
    cancelAnimationFrame(rotateTaskID);
    counter = 0;
  }

  function rotateX() {
    $taskTargets.forEach((task) => {
      if (x === 0) task.style.transform = `rotate(0deg)`;
      else if (x === 1) task.style.transform = `rotate(-0.7deg)`;
      else {
        task.style.transform = `rotate(0.7deg)`;
        x = 0;
      }
    });

    setTimeout(() => {
      x += 1;
      rotateTaskID = requestAnimationFrame(rotateX);
    }, 100);
  }
}
