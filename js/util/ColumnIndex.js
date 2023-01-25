import { getListData } from "../dataUtil.js";

const columnName = ["todo", "doing", "done"];

const findColumnName = async (ID) => {
  const listData = await getListData();
  const index = listData.findIndex((obj) => obj.id == ID);
  const columnIdx = columnName.findIndex(
    (obj) => obj === listData[index].status
  );
  return columnIdx;
};

const findItemIdex = async (ID) => {
  const listData = await getListData();
  const index = listData.findIndex((obj) => obj.id == ID);
  return index;
};

export { findColumnName, findItemIdex };
