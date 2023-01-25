import { getListData } from '../dataUtil.js';
import { columnNames } from '../column.js';

const countItemNum = document.querySelectorAll('.count-num');

async function itemCounter(columnName) {
  const listData = await getListData();
  const filteredItem = listData.filter((elem) => elem.status === columnName);
  const columnIndex = columnNames.indexOf(columnName);

  countItemNum[columnIndex].innerText = filteredItem.length;
}

export { itemCounter };
