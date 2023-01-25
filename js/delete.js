import { addLogItem } from "./logItem.js";
import { deleteListData } from "./dataUtil.js";

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
    const targetColumn = targetItem.closest("ul").id;
    const focusItem = document.querySelector(".focus");
    deleteListData(targetItemId);
    addLogItem({
      action: "Delete",
      title: targetTitle,
      to: targetColumn,
      from: "",
    });
    focusItem.remove();
    closeModal();
  }
};

export { openModal, cancelDeteleItem, deleteItem };
