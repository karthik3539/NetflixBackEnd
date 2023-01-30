const Sessions = require("../db/model/sessionmodel").Sessions;

function createNewSession(userId, token) {
  let session = { userId, token };
  return Sessions.create(session);
}

function getSessionByKey(userId, token) {
  let filterQuery = { userId, token };
  return Sessions.find(filterQuery).exec();
}

function removeSession(userId, token) {
  return getSessionByKey(userId, token)
    .then((sessions) => sessions[0])
    .then((sessions) => sessions.remove());
}

function getSessionByUserId(UserId) {
  return Sessions.find({ userid }).exec();
}

module.exports = {
  createNewSession,
  getSessionByKey,
  removeSession,
  getSessionByUserId,
};
