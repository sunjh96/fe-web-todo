const fs = require('fs');

module.exports = async (req, res) => {
  const { loginedUser, statusName, title, content } = req.body;
  let userData = await require(`./users/${loginedUser}/GET.json`);
  let { status } = userData;

  if (statusName) {
    let taskList = [];
    let taskIndex = -1;
    let statusIndex = -1;

    status.forEach((obj, idx) => {
      if (Object.keys(obj)[0] === statusName) {
        taskList = obj[statusName];
        statusIndex = idx;
        return false;
      }
    });

    taskList.forEach((task, idx) => {
      if (task['title'] === title) {
        taskList.splice(idx, 1, { title, content, author: loginedUser, date: Date.now() });
        taskIndex = idx;
        return false;
      }
    });

    taskIndex === -1 && (taskList = [...taskList, { title, content, author: loginedUser, date: Date.now() }]);
    status.splice(statusIndex, 1, { [statusName]: taskList });
    userData = { ...userData, status };
    fs.writeFile(`./src/api/users/${loginedUser}/GET.json`, JSON.stringify(userData), function (err) {
      if (err) throw err;
    });
  }

  return res.status(201).send('저장 완료');
};
