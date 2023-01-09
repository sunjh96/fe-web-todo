const fs = require('fs');

// Status별 Task 추가 메서드
module.exports = async (req, res) => {
  const { loginedUser, statusName, title, content } = req.body;
  let userData = {};

  const prom = async () => {
    userData = JSON.parse(fs.readFileSync(`./src/api/users/${loginedUser}/GET.json`, 'utf8'));
  };
  await prom();
  const { status } = userData;

  if (statusName) {
    let taskList = [];
    let taskIndex = -1;

    Object.entries(status).forEach(([key, val]) => {
      if (key === statusName) {
        taskList = [...val];
        return false;
      }
    });

    taskList.forEach((task, idx) => {
      if (task['title'] === title && title !== '') {
        taskList.splice(idx, 1, { title, content, author: loginedUser, date: Date.now() });
        taskIndex = idx;
        return false;
      }
    });

    taskIndex === -1 && (taskList = [...taskList, { title, content, author: loginedUser, date: Date.now() }]);

    const newStatus = { ...status, [`${statusName}`]: taskList };
    const newUserData = { ...userData, status: newStatus };

    fs.writeFileSync(`./src/api/users/${loginedUser}/GET.json`, JSON.stringify(newUserData), function (err) {
      if (err) throw err;
    });
  }

  return res.status(201).send('저장 완료');
};
