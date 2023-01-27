import { client } from './client.js';

export const getListData = async () => {
  try {
    const res = await client.get('/lists');
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getLogData = async () => {
  try {
    const res = await client.get('/logs');
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getColumnData = async () => {
  try {
    const res = await client.get('/columns');
    return res.data;
  } catch (error) {
    return error;
  }
};

export const postListData = async ({ title, details, status, id, index }) => {
  await client.post('/lists', {
    title,
    details,
    status,
    id,
    index,
  });
};

export const postLogData = async ({ action, title, to, from = '', time, id }) => {
  await client.post('/logs', {
    action,
    title,
    to,
    from,
    time,
    id,
  });
};

export const postColumnData = async ({ title, id }) => {
  await client.post('/columns', {
    title,
    id,
  });
};

export const deleteListData = async (ID) => {
  await client.delete(`/lists/${ID}`);
};

export const patchListData = async (ID, updateDataObj) => {
  await client.patch(`/lists/${ID}`, updateDataObj);
};
