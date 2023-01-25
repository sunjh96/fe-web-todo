import { makeListCard } from "./template/list.js";
import { getListData } from "./dataUtil.js";
import { columnNames } from "./column.js";

const listColumns = document.querySelectorAll(".item-list");

const showItems = async () => {
  const listData = await getListData();
  const sortedData = listData.sort(function (a, b) {
    return a.index - b.index;
  });
  console.log(sortedData);
  sortedData.map((item) => {
    const card = makeListCard({
      title: item.title,
      details: item.details,
      id: item.id,
    });
    //prettier-ignore
    columnNames
      .filter((columnName) => item.status === columnName)
        .map((columnName) => {
          const index=columnNames.indexOf(columnName)
          listColumns[index].insertAdjacentHTML("beforeend", card);
        });
  });
};

export { showItems };
