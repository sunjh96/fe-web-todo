import { cardTemplate } from '../src/template/cardTemplate.js';
import { getListData } from './api/dataUtil.js';
import { columnNames } from './column.js';

const listColumns = document.querySelectorAll('.item-list');

const showItems = async () => {
  const listData = await getListData();
  const sortedData = listData.sort(function (a, b) {
    return a.index - b.index;
  });
  sortedData.map((item) => {
    const cardData = { title: item.title, details: item.details, id: item.id };
    const card = cardTemplate(cardData);

    columnNames
      .filter((columnName) => item.status === columnName)
      .map((columnName) => {
        const index = columnNames.indexOf(columnName);
        listColumns[index].insertAdjacentHTML('beforeend', card);
      });
  });
};

export { showItems };
