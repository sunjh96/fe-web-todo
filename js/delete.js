import { arrCount } from "./arrCount.js";
import { addLogItem } from "./logItem.js";
import { getListData } from "./dataUtil.js";
import { findColumnName } from "./ColumnIndex.js";

const column = ["해야할 일", "하고 있는 일", "완료한 일"];
const columnStatus = ["todo", "doing", "done"];

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

const deleteItem = async (e) => {
  if (e.target.id == "modal-delete-btn") {
    const listData = await getListData();
    const index = listData.findIndex((obj) => obj.id == defineItemTarget.Id);
    const columnIdx = columnStatus.findIndex(
      (obj) => obj == listData[index].status
    );
    const focusItem = document.querySelector(".focus");
    await axios.delete(`http://localhost:3001/lists/${defineItemTarget.Id}`);
    console.log({
      action: "Delete",
      title: listData[index].title,
      to: column[columnIdx],
      from: "",
    });
    addLogItem({
      action: "Delete",
      title: listData[index].title,
      to: column[columnIdx],
      from: "",
    });
    focusItem.remove();
    closeModal();
    arrCount(columnIdx);
  }
};

export { openModal, cancelDeteleItem, deleteItem };
