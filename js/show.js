import { makeListCard } from "./template/listItem.js";
import { getListData } from "./dataUtil.js";

const toDoList = document.getElementById("todo"); // 할 일 리스트창
const doingList = document.getElementById("doing"); // 할 일 리스트창
const doneList = document.getElementById("done"); // 할 일 리스트창
const condition = ["todo", "doing", "done"];
const columnName = [toDoList, doingList, doneList];
const CONSTANT = [0, 1, 2];

const showItems = async () => {
  const listData = await getListData();
  const sortedData = listData.sort(function (a, b) {
    return a.index - b.index;
  });
  console.log(sortedData);
  sortedData.map((item) => {
    const card = makeListCard({
      title: item.title,
      detail: item.details,
      id: item.id,
    });
    //prettier-ignore
    CONSTANT
      .filter((idx) => item.status === condition[idx])
        .map((el) => {
          columnName[el].insertAdjacentHTML("beforeend", card);
        });
  });
};

export { showItems };
