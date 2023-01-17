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
  await axios
    .post("http://localhost:3001/lists", {
      title: title,
      details: details,
      status: status,
      id: id,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const postLogData = async ({ action, title, to, from = "", time = "" }) => {
  console.log({ action, title, to, from, time });
  try {
    let result = await axios.post("http://localhost:3001/logs", {
      action: action,
      title: title,
      to: to,
      from: from,
      id: time,
    });
    console.log(result.response.data);
  } catch (error) {
    console.log(error);
  }
};

export { getListData, getLogData, postLogData, postListData };
