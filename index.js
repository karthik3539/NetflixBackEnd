const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserHandler = require("./handler/UserHandler");
const Authentication = require("./middleware/authentication");
const Authorization = require("./middleware/authorization");
const AuthHandler = require("./handler/authHandler");
const Roles = require("./db/constants/role");
const ShowHandler = require("./handler/showHandler");
const dotenv = require("dotenv");
const { path } = require("ramda");
dotenv.config();
app.use(express.json());

let clusterUrl = "cluster0.ibumfn4.mongodb.net";
let userName = process.env.MONGO_USERNAME;
let password = process.env.MONGO_PASSWORD;
let dbName = "Netflix-Backend";
let dbUrl = `mongodb+srv://karthik3539:mongo123@${clusterUrl}/${dbName}`;
console.log(dbUrl);
mongoose
  .connect(dbUrl)
  .then(() => console.log("connected to mongodb succesfully"))
  .catch((error) => console.log(`${error}`));

app.get("/", (req, res) => {
  res.send("succesful respose");
});

app.post("/user", UserHandler.SignUpHandler);
app.post(
  "/user/profile",
  Authentication.checkIfAuthenticated,
  Authorization.checkIfAuthorized([Roles.ROLE_CUSTOMER]),
  UserHandler.addNewProfile
);

app.post(
  "/",
  Authentication.checkIfAuthenticated,
  Authorization.checkIfAuthorized([Roles.ROLE_CUSTOMER]),
  function (req, res) {
    res.status(200).send("your logged in");
  }
);
app.post("/login", AuthHandler.login);
app.post(
  "/logout",
  Authentication.checkIfAuthenticated,
  Authorization.checkIfAuthorized([Roles.ROLE_USER, Roles.ROLE_CUSTOMER]),
  AuthHandler.logout
);

app.get(
  "/show/:showId",
  Authentication.checkIfAuthenticated,
  Authorization.checkIfAuthorized([Roles.ROLE_CUSTOMER, Roles.ROLE_USER]),
  ShowHandler.getShowById
);

app.get(
  "/show/:showId/series/:seriesId",
  Authentication.checkIfAuthenticated,
  Authorization.checkIfAuthorized([Roles.ROLE_CUSTOMER, Roles.ROLE_USER]),
  ShowHandler.findSeriesByKey
);

app.get(
  "show/:showId/series/:seriesId/video/:videoId/link",
  Authentication.checkIfAuthenticated,
  Authorization.checkIfAuthenticated([Roles.ROLE_CUSTOMER]),
  ShowHandler.findvideoLink
);

app.post(
  "/show/:showId/series/:seriesId/video/:videoId/watchTime",
  Authentication.checkIfAuthenticated,
  Authorization.checkIfAuthorized(Roles.ROLE_CUSTOMER),
  UserHandler.updateWatchHistory
);

app.get(
  "/show/:showId/series/:seriesId/video/:videoId/watchHistory",
  Authentication.checkIfAuthenticated,
  Authorization.checkIfAuthorized([Roles.ROLE_CUSTOMER]),
  UserHandler.getWatchHistory
);

app.listen(8000, () => {
  console.log("connection sucess");
});
