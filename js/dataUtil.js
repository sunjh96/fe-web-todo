const getListData = async () => {
  try {
    const res = await axios.get("http://localhost:3001/lists");
    return res.status == 200 ? res.data : "error";
  } catch (error) {
    return error;
  }
};

const getLogData = async () => {
  try {
    const res = await axios.get("http://localhost:3001/logs");
    return res.status == 200 ? res.data : "error";
  } catch (error) {
    return error;
  }
};

const postListData = async ({ title, details, status, id }) => {
  await axios.post("http://localhost:3001/lists", {
    title: title,
    details: details,
    status: status,
    id: id,
  });
};

const postLogData = async ({ action, title, to, from = "", time }) => {
  let result = await axios.post("http://localhost:3001/logs", {
    action: action,
    title: title,
    to: to,
    from: from,
    id: time,
  });
};

const deleteListData = async (ID) => {
  await axios.delete(`http://localhost:3001/lists/${ID}`);
};

export { getListData, getLogData, postLogData, postListData, deleteListData };
