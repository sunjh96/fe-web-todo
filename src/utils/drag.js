export default function drag(event, elementToDrag = event.target) {
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
