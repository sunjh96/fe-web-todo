import { patchListData, getListData } from "./dataUtil.js";
import { addLogItem } from "./logItem.js";

let currentItem = null;
let hoverItem = null;
let dropTargetColumn = null;
let currentColumnName = null;

function mousedown(e) {
  if (
    e.target.classList.contains("item-delete-btn") ||
    e.target.classList.contains("item-edit-btn")
  ) {
    return;
  }
  currentItem = e.target.closest("li");
  if (currentItem.classList.contains("edit-focus")) {
    return;
  }
  hoverItem = currentItem.cloneNode(true);
  const currentColumn = e.target.closest("ul");
  currentColumnName = currentColumn.getAttribute("id");
  currentColumn.appendChild(hoverItem);
  currentItem.classList.add("move");
  const { pageX, pageY } = e;
  hoverItem.classList.add("blink");
  moveItem(pageX, pageY);
}

function mousemove(e) {
  if (
    e.target.classList.contains("item-delete-btn") ||
    e.target.classList.contains("item-edit-btn")
  ) {
    return;
  }
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

const readyForPatching = async () => {
  const targetId = currentItem.getAttribute("id");
  const columnStatus = dropTargetColumn.getAttribute("id");
  const updateDataObj = {
    status: columnStatus,
  };
  const listData = await getListData();
  const index = await listData.findIndex((obj) => obj.id == targetId);
  const targetTitle = listData[index].title;

  patchListData(targetId, updateDataObj);
  addLogItem({
    action: "Move",
    title: targetTitle,
    to: columnStatus,
    from: currentColumnName,
  });
};

function moveItem(X, Y) {
  hoverItem.style.left = X - hoverItem.offsetWidth / 2 + "px";
  hoverItem.style.top = Y - hoverItem.offsetWidth / 2 + "px";
}

export { mousedown, mouseup, mousemove };
