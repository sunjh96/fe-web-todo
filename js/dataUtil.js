const url = "http://localhost:3011";

const getListData = async () => {
  try {
    const res = await axios.get(url + "/lists");
    return res.status == 200 ? res.data : "error";
  } catch (error) {
    return error;
  }
};

const getLogData = async () => {
  try {
    const res = await axios.get(url + "/logs");
    return res.status == 200 ? res.data : "error";
  } catch (error) {
    return error;
  }
};

const postListData = async ({ title, details, status, id, index }) => {
  await axios.post(url + "/lists", {
    title,
    details,
    status,
    id,
    index,
  });
};

const postLogData = async ({ action, title, to, from = "", time, id }) => {
  await axios.post(url + "/logs", {
    action: action,
    title: title,
    to: to,
    from: from,
    time: time,
    id: id,
  });
};

const deleteListData = async (ID) => {
  await axios.delete(url + `/lists/${ID}`);
};

const patchListData = async (ID, updateDataObj) => {
  axios.patch(url + `/lists/${ID}`, updateDataObj);
};

export {
  getListData,
  getLogData,
  postLogData,
  postListData,
  deleteListData,
  patchListData,
};
