const R = require("ramda");
const UserService = require("../service/Userservice");

function SignUpHandler(req, res) {
  const UserInput = req.body;
  console.log(`usrerinput= ${JSON.stringify(UserInput)}`);

  if (R.isNil(UserInput.name)) {
    res.status(400).send("name not present");
    return;
  }
  if (R.isNil(UserInput.email)) {
    res.status(400).send("email not present");
    return;
  }
  if (R.isNil(UserInput.phoneNo)) {
    res.status(400).send("phoneNo not present");
    return;
  }
  UserService.addNewUser(UserInput)
    .then(() => res.status(200).send("usercreated succefully"))
    .catch((error) => res.status(500).send(error));
}

function addNewProfile(req, res) {
  const name = req.body.name;
  const userId = req.userId;
  UserService.addNewProfile(userId, name).then(() => {
    res.status(500).send(error);
  });
}

function deactivateProfile(req, res) {
  const profileId = req.params.profileId;
  const userId = req.userId;
  UserService.deactivateProfile(userId, profileId)
    .then(() => {
      res.status(200).send("profile deactivated successfully");
    })
    .catch((error) => {
      console.log(`error =${error}`);
      res.status(500).send(error);
    });
}

function updateWatchHistory(req, res) {
  const showId = req.params.showId;
  const seriesId = req.params.seriesId;
  const videoId = req.params.videoId;
  const userId = req.userId;
  const watchTime = req.body.watchTime;

  UserService.updateWatchHistory(userId, showId, seriesId, videoId, watchTime)
    .then(() => {
      res.status(200).send("watch history updated");
    })
    .catch((error) => {
      console.log(`error=${error}`);
      res.status(500).send(error);
    });
}

function getWatchHistory(req, res) {
  const showId = req.params.showId;
  const seriesId = req.params.seriesId;
  const videoId = req.params.videoId;
  const userId = req.userId;

  return UserService.getWatchHistory(userId, seriesId, showId, videoId)
    .then((watchHistory) => {
      res.status(200).send(watchHistory);
    })
    .catch((error) => {
      console.log(`errror =${error}`);
      res.status(500).send(error);
    });
}

module.exports = {
  SignUpHandler,
  addNewProfile,
  updateWatchHistory,
  deactivateProfile,
  getWatchHistory,
};
