const express = require("express");
const { createUser, loginUser, logOut } = require("../controllers/users");
const validateUser = require("../middlewares/auth");

const usersRouter = express.Router();

usersRouter.post("/register", createUser);
usersRouter.post("/login", loginUser);
usersRouter.post("/logout", logOut);
usersRouter.get("/me", validateUser, (req, res) => {
  res.status(200).send({ status: "OK", ...req.user });
});

module.exports = usersRouter;
