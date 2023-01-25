const countItemNum = document.querySelectorAll(".count-num");
import { getListData } from "../dataUtil.js";
const columnName = ["todo", "doing", "done"];

//  리스트 개수 카운트
async function arrCount(index) {
  const listData = await getListData();
  const filteredArray = listData.filter(
    (ele) => ele.status === columnName[index]
  );
  countItemNum[index].innerText = filteredArray.length;
  return filteredArray.length;
}

export { arrCount };
