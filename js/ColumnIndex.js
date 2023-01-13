import { listData } from "./data/listData.js";
import { columnName } from "./data/column.js";

const findColumnName = (ID) => {
  let index = listData.findIndex((obj) => obj.id == ID);
  console.log(index);
  const columnIdx = columnName.findIndex(
    (obj) => obj === listData[index].status
  );
  return columnIdx;
};

export { findColumnName };
