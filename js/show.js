import { listData } from "./data/listData.js";
import { makeListCard } from "./template/listItem.js";

const toDoList = document.getElementById("item-todo-list"); // 할 일 리스트창
const doingList = document.getElementById("item-doing-list"); // 할 일 리스트창
const doneList = document.getElementById("item-done-list"); // 할 일 리스트창
const condition = ["todo", "doing", "done"];
const columnName = [toDoList, doingList, doneList];
const CONSTANT = [0, 1, 2];

const showItems = () => {
  listData.map((item) => {
    const card = makeListCard({
      title: item.title,
      detail: item.details,
      id: item.id,
    });
    CONSTANT.filter((ele) => item.status === condition[ele]).map((ele) => {
      columnName[ele].insertAdjacentHTML("beforeend", card);
    });
  });
};

export { showItems };
