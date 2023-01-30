const R = require("ramda");
const jwt = require("jsonwebtoken");
const UserAccesor = require("../accesor/Useraccesor");
const SECRET_KEY = "abcd1234";
const SessionAccessor = require("../accesor/sessionscccesor");

function login(email, password) {
  return UserAccesor.findMyEmail(email).then((users) => {
    if (R.isNil(users) || users.length === 0) {
      return { statusCode: 401, message: "Invalid email" };
    }
    let user = users[0];
    if (R.isNil(user.password) || user.password !== password) {
      return { statusCode: 401, message: "Invalid password" };
    }
    const token = jwt.sign(
      { userId: user.userId, email: user.email, role: user.role },
      SECRET_KEY
    );
    return { statusCode: 200, token: token };
  });
}

function logout(userId) {
  SessionAccessor.getSessionByUserId(req.userId).then((sessions) => {
    return Promise.all(sessions.map((session) => session.remove()));
  });
}

module.exports = {
  login,
  logout,
};
