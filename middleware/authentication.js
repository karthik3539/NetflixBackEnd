const jwt = require("jsonwebtoken");
const SessionAccessor = require("../accesor/sessionscccesor");
const R = require("ramda");
const { Sessions } = require("../db/model/sessionmodel");
const SECRET_KEY = "abcd1234";

function checkIfAuthenticated(req, res, next) {
  const tokenString = req.headers["authorization"];
  if (!R.isNil(tokenString)) {
    const actualToken = tokenString.split("")[1];
    if (!R.isNil(actualToken)) {
      try {
        let data = jwt.verify(actualToken, SECRET_KEY);
        let userId = data["userId"];
        SessionAccessor.getSessionByKey(userId, actualToken).then(
          (Sessions) => {
            let session = Sessions[0];
            if (!R.isNil(session)) {
              req.userId = userId;
              next();
            } else {
              res
                .status(401)
                .send("could not find a session for you! please login again");
            }
          }
        );
      } catch (error) {
        res.status(401).send("unable to decode the error");
      }
    } else {
      res.status(401).send("please login before aceesing the Api");
    }
  } else {
    res.status(401).send("please login before aceesing the Api");
  }
}

module.exports = {
  checkIfAuthenticated,
};
