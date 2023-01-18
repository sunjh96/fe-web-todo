import { patchListData } from "./dataUtil.js";

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
    dropTargetColumn = e.target.closest("ul");
    moveItem(pageX, pageY);
  }
}

function mouseup(e) {
  if (dropTargetColumn !== null) {
    dropTargetColumn.appendChild(currentItem);
    readyForPatching();
    currentItem.classList.remove("move");
    hoverItem.remove();
    currentItem = null;
    hoverItem = null;
    dropTargetColumn = null;
  }
}

function readyForPatching() {
  const targetId = currentItem.getAttribute("id");
  const columnStatus = dropTargetColumn.getAttribute("id");
  const updateDataObj = {
    status: columnStatus,
  };
  patchListData(targetId, updateDataObj);
}

function moveItem(X, Y) {
  hoverItem.style.left = X - hoverItem.offsetWidth / 2 + "px";
  hoverItem.style.top = Y - hoverItem.offsetWidth / 2 + "px";
}

export { mousedown, mouseup, mousemove };
