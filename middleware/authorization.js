const R = require("ramda");
const Useraccessor = require("../accesor/Useraccesor");

function checkIfAuthorized(allowedRoles) {
  return function (req, res, next) {
    Useraccessor.findByUserId(req.userId).then((users) => {
      let user = users[0];
      if (!R.isNil(user)) {
        if (allowedRoles.includes(user.role)) {
          req.user = user;
          next();
        } else {
          res.status(403).send("user not authorization");
        }
      } else {
        res.status(403).send("could not find  user info");
      }
    });
  };
}

module.exports = {
  checkIfAuthorized,
};
