const fs = require('fs');

// Status별 Task 추가 메서드
module.exports = async (req, res) => {
  const { loginedUser, statusName, title, content, taskId, active } = req.body;
  let userData = {};

  const prom = async () => {
    userData = JSON.parse(fs.readFileSync(`./src/api/users/${loginedUser}/GET.json`, 'utf8'));
  };
  await prom();
  const { status, taskCount } = userData;

  if (statusName) {
    let taskList = [];
    let taskIndex = -1;

    Object.entries(status).some(([key, val]) => {
      if (key === statusName) {
        taskList = [...val];
      }
      return key === statusName;
    });

    taskList.some((task, idx) => {
      if (task['taskId'] === parseInt(taskId)) {
        taskList.splice(idx, 1, { title, content, author: loginedUser, date: Date.now(), taskId, active: true });
        taskIndex = idx;
      }

      return task['taskId'] === parseInt(taskId);
    });
    taskIndex === -1 && (taskList = [...taskList, { title, content, author: loginedUser, date: Date.now(), taskId: taskCount + 1, active: false }]);

    const newStatus = { ...status, [`${statusName}`]: taskList };
    const newUserData = { ...userData, status: newStatus, taskCount: taskCount + 1 };

    fs.writeFileSync(`./src/api/users/${loginedUser}/GET.json`, JSON.stringify(newUserData), function (err) {
      if (err) throw err;
    });
  }

  return res.status(201).send('저장 완료');
};
