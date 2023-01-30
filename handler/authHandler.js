const { removeSession } = require("../accesor/sessionscccesor");
const AuthService = require("../service/authService");

function login(req, res) {
  const { email, password } = req.body;
  return AuthService.login(email, password)
    .then((output) => {
      if (output.statusCode === 200) {
        res.status(200).send(output.token);
      } else {
        res.status(output.statusCode).send("login failed");
      }
    })
    .catch((error) => res.status(500).send(error));
}

function logout(req, res) {
  AuthService.logout(req.user.userId)
    .then(() => {
      res.status(200).send("logout out succesfully");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
}
module.exports = {
  login,
  logout,
};
