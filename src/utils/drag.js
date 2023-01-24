export default function drag(event, elementToDrag = event.target) {
  elementToDrag = elementToDrag.closest('[data-task]');
  elementToDrag.style.position = 'absolute';
  elementToDrag.style.zIndex = '100';

  const startX = event.clientX;
  const startY = event.clientY;

  const origX = elementToDrag.offsetLeft;
  const origY = elementToDrag.offsetTop;

  const deltaX = startX - origX;
  const deltaY = startY - origY;

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
