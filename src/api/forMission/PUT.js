const fs = require('fs');

// Status별 Task 추가 메서드
module.exports = async (req, res) => {
  const { loginedUser, statusName, title, content, taskId, taskActive } = req.body;
  let userData = {};

  const prom = async () => {
    userData = JSON.parse(fs.readFileSync(`./src/api/users/${loginedUser}/GET.json`, 'utf8'));
  };
  await prom();
  const { status, taskCount } = userData;

  let taskList = [];
  let taskIndex = -1;

  Object.entries(status).some(([key, val]) => {
    if (key === statusName) {
      taskList = [...val];
    }
    return key === statusName;
  });
  if (!title && !content && !taskActive && !taskId) {
    delete status[`${statusName}`];

    const newStatus = { ...status };
    const newUserData = { ...userData, status: newStatus, taskCount };

    fs.writeFileSync(`./src/api/users/${loginedUser}/GET.json`, JSON.stringify(newUserData), function (err) {
      if (err) throw err;
    });
  } else if (!title && !content && !taskActive && taskId) {
    taskList.some((task, idx) => {
      if (parseInt(task['taskId']) === parseInt(taskId)) {
        taskList.splice(idx, 1);
      }

      return task['taskId'] === parseInt(taskId);
    });

    const newStatus = { ...status, [`${statusName}`]: taskList };
    const newUserData = { ...userData, status: newStatus, taskCount };

    fs.writeFileSync(`./src/api/users/${loginedUser}/GET.json`, JSON.stringify(newUserData), function (err) {
      if (err) throw err;
    });
  } else if (!title && !content && title !== '' && content !== '') {
    taskList.some((task, idx) => {
      if (parseInt(task['taskId']) === parseInt(taskId)) {
        taskList.splice(idx, 1, {
          title: task.title,
          content: task.content,
          author: loginedUser,
          date: Date.now(),
          taskId: task.taskId,
          taskActive,
        });
      }

      return task['taskId'] === parseInt(taskId);
    });

    const newStatus = { ...status, [`${statusName}`]: taskList };
    const newUserData = { ...userData, status: newStatus, taskCount };

    fs.writeFileSync(`./src/api/users/${loginedUser}/GET.json`, JSON.stringify(newUserData), function (err) {
      if (err) throw err;
    });
  } else if (statusName) {
    taskList.some((task, idx) => {
      if (parseInt(task['taskId']) === parseInt(taskId)) {
        taskList.splice(idx, 1, { title, content, author: loginedUser, date: Date.now(), taskId, taskActive });
        taskIndex = idx;
      }

      return task['taskId'] === parseInt(taskId);
    });

    taskIndex === -1 && (taskList = [...taskList, { title, content, author: loginedUser, date: Date.now(), taskId: taskCount + 1, taskActive }]);

    const newStatus = { ...status, [`${statusName}`]: taskList };
    const newUserData = { ...userData, status: newStatus, taskCount: taskCount + 1 };

    fs.writeFileSync(`./src/api/users/${loginedUser}/GET.json`, JSON.stringify(newUserData), function (err) {
      if (err) throw err;
    });
  }

  return res.status(201).send('저장 완료');
};
