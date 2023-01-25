import { getListData } from "../dataUtil.js";
import { columnNames } from "../column.js";
const countItemNum = document.querySelectorAll(".count-num");
async function arrCounter(columnName) {
  const listData = await getListData();
  const filteredArray = listData.filter((ele) => ele.status === columnName);
  const index = columnNames.indexOf(columnName);
  countItemNum[index].innerText = filteredArray.length;
}

export { arrCounter };
