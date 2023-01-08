const fs = require('fs');

module.exports = async (req, res) => {
  const { loginedUser, statusName } = req.body;
  const userData = require(`./users/${loginedUser}/GET.json`);
  const { status } = userData[0];

  if (statusName) {
    let checkDup = false;

    status.forEach((obj) => {
      if (Object.keys(obj)[0] === statusName) {
        checkDup = true;
      }
    });

    !checkDup && status.push({ [`${statusName}`]: [] });

    userData[0] = { ...userData[0], status };

    fs.writeFile(`./src/api/users/${loginedUser}/GET.json`, JSON.stringify(userData[0]), function (err) {
      if (err) throw err;
    });
  }

  return res.status(201);
};
