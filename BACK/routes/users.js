const express = require("express");
const {
  createUser,
  loginUser,
  logOut,
  updateUser,
} = require("../controllers/users");
const validateUser = require("../middlewares/auth");

const usersRouter = express.Router();
//Register: front debe enviar los campos: name , email, password , address ,phone.
usersRouter.post("/register", createUser);
//Login: front debe enviar los campos email , password.
usersRouter.post("/login", loginUser);
//logout: front no debe enviar nada.
usersRouter.get("/logout", logOut);
usersRouter.get("/me", validateUser, (req, res) => {
  res.status(200).send({ status: "OK", ...req.user });
});
//update: front debe enviar email si o si y opcionales a modificar: name , email, password ,address y phone. (Los input name,email,address y phone deben estar autocompletados con los valores obtenidos del estado de redux. El input de password debe estar en blanco,osea un string vacío, y solo modificará a password en caso de que se escriba algo en dicho campo.)
usersRouter.post("/update", updateUser);

module.exports = usersRouter;
