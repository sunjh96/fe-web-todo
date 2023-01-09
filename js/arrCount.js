import { todos } from "./data.js";
const todoNum = document.querySelectorAll(".countNum");

//  리스트 개수 카운트
function arrCount(str) {
  const filteredArray = todos.filter((ele) => ele.status === str);
  return filteredArray.length;
}

todoNum[0].innerText = arrCount("todo");
todoNum[1].innerText = arrCount("doing");
todoNum[2].innerText = arrCount("done");

export default { arrCount };
