import { addLogItem } from "./logItem.js";
import { patchListData } from "./dataUtil.js";

let cardWrapper = null;
let authorBox = null;
let contentBox = null;

const openItemEditForm = (e) => {
  if (e.target.className.includes("item-edit-btn")) {
    console.log(e.target.closest("input"));
    cardWrapper = e.target.closest("li");
    cardWrapper.classList.add("edit-focus");

    contentBox = cardWrapper.childNodes[1];
    contentBox.classList.add("hidden");

    authorBox = cardWrapper.childNodes[3];
    authorBox.classList.remove("hidden");
  }
};

const closeItemEditForm = () => {
  contentBox.classList.remove("hidden");
  cardWrapper.classList.remove("edit-focus");
  authorBox.classList.add("hidden");
};

const cancelItemEditForm = (e) => {
  if (e.target.className === "item-edit-cancel-btn") {
    closeItemEditForm();
  }
};

const editItemEditForm = async (e) => {
  if (e.target.className === "item-edit-active-btn") {
    const editContent = e.target.parentNode.parentNode;
    const revisedTitle = editContent.querySelector(
      ".item-edit-title-input"
    ).value;
    const revisedDetail = editContent.querySelector(
      ".item-edit-detail-input"
    ).value;

    const parentNode = editContent.parentNode;
    const ColumnName = editContent.closest("ul").id;

    const targetId = parentNode.getAttribute("id");

    const updateDataObj = { title: revisedTitle, details: revisedDetail };
    patchListData(targetId, updateDataObj);

    parentNode.querySelector(".item-title").innerHTML = revisedTitle;
    parentNode.querySelector(".item-detail").innerHTML = revisedDetail;

    addLogItem({
      action: "Update",
      title: revisedTitle,
      to: ColumnName,
      from: "",
    });
    closeItemEditForm();
  }
};

export { openItemEditForm, cancelItemEditForm, editItemEditForm };
