import { addLogItem } from "./logItem.js";
import { deleteListData } from "./dataUtil.js";
import { arrCounter } from "./util/arrCounter.js";
import { patchListData } from "./dataUtil.js";

let targetItem = null;
let targetItemId = null;

const closeModal = () => {
  document.querySelector(".modal").classList.add("hidden");
  targetItem = null;
  targetItemId = null;
};

const cancelDeteleItem = (e) => {
  if (
    e.target.id === "modal-cancel-btn" ||
    e.target.className === "modal-background"
  ) {
    closeModal();
    document.querySelector(".focus").classList.remove("focus");
  }
};

const openModal = (e) => {
  if (e.target.id == "item-delete-btn") {
    document.querySelector(".modal").classList.remove("hidden");
    targetItem = e.target.closest("li");
    targetItem.classList.add("focus");
    targetItemId = parseInt(targetItem.getAttribute("id"));
  }
};

const deleteItem = async (e) => {
  if (e.target.id === "modal-delete-btn") {
    const targetTitle = targetItem.dataset.title;
    const targetColumn = targetItem.closest("ul");
    const targetColumnId = targetItem.closest("ul").id;
    const focusItem = document.querySelector(".focus");
    deleteListData(targetItemId);
    addLogItem({
      action: "Delete",
      title: targetTitle,
      to: targetColumnId,
      from: "",
    });

    focusItem.remove();
    const currentColumnArr = [...targetColumn.children];
    if (currentColumnArr !== null) {
      currentColumnArr.map((item) => {
        const updateDataObj = {
          index: currentColumnArr.indexOf(item),
        };
        patchListData(item.id, updateDataObj);
      });
    }
    arrCounter(targetColumnId);
    closeModal();
  }
};

export { openModal, cancelDeteleItem, deleteItem };
