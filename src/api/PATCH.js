const fs = require('fs');

module.exports = async (req, res) => {
  const { loginedUser, statusName } = req.body;
  let userData = await require(`./users/${loginedUser}/GET.json`);
  const { status } = userData;

  if (statusName) {
    let checkDup = false;

    status.forEach((obj) => {
      if (Object.keys(obj)[0] === statusName) {
        checkDup = true;
      }
    });

    !checkDup && status.push({ [`${statusName}`]: [] });

    userData = { ...userData, status };

    fs.writeFile(`./src/api/users/${loginedUser}/GET.json`, JSON.stringify(userData), function (err) {
      if (err) throw err;
    });
  }

  return res.status(201).send('업데이트 완료');
};
