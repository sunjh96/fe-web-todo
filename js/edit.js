import { makeLogMsg } from "./template/makeTemplate.js";
import { logData } from "./data/logData.js";
import { listData } from "./data/listData.js";

const Logcondition = ["해야할 일", "하고 있는 일", "완료한 일"];
const conditions = ["todo", "doing", "done"];

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

const findColumnName = (ID) => {
  let index = listData.findIndex((obj) => obj.id == ID);
  console.log(index);
  const columnId = conditions.findIndex(
    (obj) => obj === listData[index].status
  );
  return columnId;
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
    const targetId = targetNode.parentNode.getAttribute("id");
    listData.filter((item) => {
      item["id"] == targetId
        ? (item["title"] = revisedTitle) && (item["details"] = revisedDetail)
        : "";
    });
    let today = new Date();

    const newLogItem = makeLogMsg({
      action: "Update",
      title: revisedTitle,
      from: "",
      to: Logcondition[ColumnName],
      time: today.toLocaleString(),
    });
    const menuLogWrapper = document.querySelector(".menu-log-wrapper");
    menuLogWrapper.insertAdjacentHTML("afterbegin", newLogItem);
    logData.push({
      Action: "Update",
      Title: revisedTitle,
      To: Logcondition[ColumnName],
      From: "",
      time: today.toLocaleString(),
    });

    closeItemEditForm(parentNode);
  }
};

export { openItemEditForm, cancelItemEditForm, editItemEditForm };
