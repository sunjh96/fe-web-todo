import { COLUMN_NAME } from './constants/TODO.js';
import { patchListData } from './api/dataUtil.js';

const columnNames = [COLUMN_NAME.TODO, COLUMN_NAME.DOING, COLUMN_NAME.DONE];

const updateColumnList = (currentColumnList) => {
  if (!currentColumnList) return;

  currentColumnList.map((item) => {
    const updateCardIndex = { index: currentColumnList.indexOf(item) };

    patchListData(item.id, updateCardIndex);
  });
};

export { updateColumnList, columnNames };
