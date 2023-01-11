import { todos } from "./data.js";
const countItemNum = document.querySelectorAll(".count-num");
const columnName = ["todo", "doing", "done"];

//  리스트 개수 카운트
function arrCount(index) {
  const filteredArray = todos.filter((ele) => ele.status === columnName[index]);
  countItemNum[index].innerText = filteredArray.length;
  return filteredArray.length;
}

export { arrCount };
