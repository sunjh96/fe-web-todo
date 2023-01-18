let currentItem = null;
let hoverItem = null;
let dropTargetColumn = null;

function mousedown(e) {
  currentItem = e.target.closest("li");
  hoverItem = currentItem.cloneNode(true);
  const currentColumn = e.target.closest("ul");
  currentColumn.appendChild(hoverItem);
  currentItem.classList.add("move");
  const { pageX, pageY } = e;
  hoverItem.classList.add("blink");
  moveItem(pageX, pageY);
}

function mousemove(e) {
  if (hoverItem !== null) {
    const { pageX, pageY } = e;
    console.log(pageX, pageY);
    dropTargetColumn = e.target.closest("ul");
    console.log(dropTargetColumn);
    moveItem(pageX, pageY);
  }
}

function mouseup(e) {
  dropTargetColumn.appendChild(currentItem);
  currentItem.classList.remove("move");
  hoverItem.remove();
  currentItem = null;
  hoverItem = null;
  dropTargetColumn = null;
}

function moveItem(X, Y) {
  hoverItem.style.left = X - hoverItem.offsetWidth / 2 + "px";
  hoverItem.style.top = Y - hoverItem.offsetWidth / 2 + "px";
}

export { mousedown, mouseup, mousemove };
