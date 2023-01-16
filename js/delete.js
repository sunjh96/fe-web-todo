import { arrCount } from "./arrCount.js";
import { listData } from "./data/listData.js";
import { findColumnName } from "./ColumnIndex.js";
import { addLogItem } from "./logItem.js";

const column = ["해야할 일", "하고 있는 일", "완료한 일"];

const defineItemTarget = {
  get condition() {
    return this._condition;
  },
  set condition(num) {
    this._condition = num;
  },
  get Item() {
    return this._Item;
  },
  set Item(str) {
    this._Item = str;
  },
  get Id() {
    return this._Id;
  },
  set Id(num) {
    this._Id = num;
  },
};

const closeModal = () => {
  document.getElementById("modal").classList.add("hidden");
};

const cancelDeteleItem = (e) => {
  if (
    e.target.id == "modal-cancel-btn" ||
    e.target.className === "modal-background"
  ) {
    closeModal();
    document.querySelector(".focus").classList.remove("focus");
  }
};

const openModal = (e) => {
  if (e.target.id == "item-delete-btn") {
    document.getElementById("modal").classList.remove("hidden");
    const itemNode = e.target.parentNode.parentNode.parentNode;
    defineItemTarget.Item = itemNode;
    itemNode.classList.add("focus");
    defineItemTarget.Id = parseInt(itemNode.getAttribute("id"));
  }
};

const deleteItem = (e) => {
  if (e.target.id == "modal-delete-btn") {
    listData
      .filter((item) => item.id === defineItemTarget.Id)
      .map(() => {
        let index = listData.findIndex((obj) => obj.id === defineItemTarget.Id);
        const columnIdx = findColumnName(defineItemTarget.Id);
        addLogItem({
          action: "Delete",
          title: listData[index].title,
          to: column[columnIdx],
          from: "",
        });
        listData.splice(index, 1);
        const focusItem = document.querySelector(".focus");
        focusItem.remove();
        closeModal();
        arrCount(columnIdx);
      });
  }
};

export { openModal, cancelDeteleItem, deleteItem, defineItemTarget };
