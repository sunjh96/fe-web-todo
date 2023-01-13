import { listData } from "./data/listData.js";
import { findColumnName } from "./ColumnIndex.js";
import { addLogItem } from "./logItem.js";

const logConditions = ["해야할 일", "하고 있는 일", "완료한 일"];

const openItemEditForm = (e) => {
  if (e.target.className.includes("item-edit-btn")) {
    const parentNode = e.target.parentNode.parentNode.parentNode;
    parentNode.childNodes[1].classList.add("hidden");
    parentNode.classList.add("edit-focus");
    parentNode.childNodes[3].classList.remove("hidden");
  }
};

const closeItemEditForm = (parentNode) => {
  parentNode.childNodes[1].classList.remove("hidden");
  parentNode.classList.remove("edit-focus");
  parentNode.childNodes[3].classList.add("hidden");
};

const cancelItemEditForm = (e) => {
  if (e.target.className === "item-edit-cancel-btn") {
    const parentNode = e.target.parentNode.parentNode.parentNode;
    closeItemEditForm(parentNode);
  }
};

const editItemEditForm = (e) => {
  if (e.target.className === "item-edit-active-btn") {
    const targetNode = e.target.parentNode.parentNode;
    const parentNode = targetNode.parentNode;
    const ColumnName = findColumnName(parentNode.id);
    const revisedTitle = targetNode.querySelector(
      ".item-edit-title-input"
    ).value;
    const revisedDetail = targetNode.querySelector(
      ".item-edit-detail-input"
    ).value;
    const targetId = parentNode.getAttribute("id");
    listData.filter((item) => {
      item["id"] == targetId
        ? (item["title"] = revisedTitle) && (item["details"] = revisedDetail)
        : "";
    });
    parentNode.querySelector(".item-title").innerHTML = revisedTitle;
    parentNode.querySelector(".item-detail").innerHTML = revisedDetail;
    addLogItem({
      action: "Update",
      title: revisedTitle,
      to: logConditions[ColumnName],
      from: "",
    });
    closeItemEditForm(parentNode);
  }
};

export { openItemEditForm, cancelItemEditForm, editItemEditForm };
