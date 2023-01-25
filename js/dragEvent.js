import { patchListData, getListData } from "./dataUtil.js";
import { addLogItem } from "./logItem.js";
import { arrCounter } from "./util/arrCounter.js";

let currentItem = null;
let currentColumnArr = null;
let currentColumnName = null;

let dropTargetColumn = null;
let dropColumnArr = null;

let hoverItem = null;
let nearItemIndex = null;
let nearItem = null;

function mousedown(e) {
  if (
    e.target.classList.contains("item-delete-btn") ||
    e.target.classList.contains("item-edit-btn")
  ) {
    return;
  }
  currentItem = e.target.closest("li");
  if (currentItem === null || currentItem.classList.contains("edit-focus")) {
    return;
  }
  hoverItem = currentItem.cloneNode(true);
  const currentColumn = e.target.closest("ul");
  currentColumnName = currentColumn.getAttribute("id");
  currentColumn.appendChild(hoverItem);
  currentItem.classList.add("move");
  const { pageX, pageY } = e;
  currentColumnArr = [...currentColumn.children];
  const currentIdx = currentColumnArr.indexOf(currentItem);
  currentColumnArr.splice(currentIdx, 1);
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
  if (hoverItem) {
    const { pageX, pageY } = e;
    dropTargetColumn = e.target.closest("ul");
    dropColumnArr = [...dropTargetColumn.children];
    nearItem = e.target.closest("li");
    nearItemIndex = dropColumnArr.indexOf(nearItem);
    console.log(dropColumnArr.length);
    if (nearItemIndex === 0) {
      nearItem.before(currentItem);
    } else {
      nearItem.after(currentItem);
    }
    dropColumnArr.splice(nearItemIndex, 0, hoverItem);
    moveItem(pageX, pageY);
  }
}

function mouseup(e) {
  if (dropTargetColumn) {
    readyForPatching();
    dropTargetColumn.appendChild(currentItem);
    currentItem.classList.remove("move");
    arrCounter(currentColumnName);
    arrCounter(dropTargetColumn.getAttribute("id"));
    hoverItem.remove();
    currentItem = null;
    hoverItem = null;
    dropTargetColumn = null;
  }
}

const readyForPatching = async () => {
  console.log(currentColumnArr);
  console.log(dropColumnArr);
  const targetTitle = currentItem.dataset.title;
  const columnStatus = dropTargetColumn.getAttribute("id");
  if (currentColumnArr !== null) {
    currentColumnArr.map((item) => {
      const updateDataObj = {
        index: currentColumnArr.indexOf(item),
      };
      patchListData(item.id, updateDataObj);
    });
  }
  dropColumnArr.map((el) => {
    const updateDataObj = {
      status: columnStatus,
      index: dropColumnArr.indexOf(el),
    };
    patchListData(el.id, updateDataObj);
  });

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
