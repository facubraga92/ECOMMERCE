const { generateToken, validateToken } = require("../config/tokens");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    let user = await Users.findOne({ where: { email: req.body.email } });
    if (user) {
      res.status(401).send("Ya existe un usuario registrado con ese email.");
    } else {
      const createdUser = await Users.create(req.body);

      res.send(`Usuario creado con éxito:${createdUser.email}`).status(201);
    }
  } catch (error) {
    res.status(400).send("Hubo un error en el registro");
  }
};

const loginUser = async (req, res) => {
  let user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    res.status(401).send("Usuario incorrecto/inexistente.");
  } else {
    if (await user.validatePassword(req.body.password)) {
      const payload = {
        name: user.name,
        email: user.email,
        adress: user.adress,
        phone: user.phone,
        role: user.role,
      };
      let token = generateToken(payload);
      res.cookie("token", token);
      res.send(payload);
    } else {
      res.status(404).send("Contraseña Incorrecta");
    }
  }
};

const logOut = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    return res.status(404).send("Usuario no encontrado");
  }

  if (password) {
    const salt = user.salt;
    const hash = await bcrypt.hash(password, salt);

    req.body.password = hash;
  } else {
    delete req.body.password; // Eliminar la propiedad "password" de req.body si está vacía
  }

  const updatedUser = await Users.update(req.body, {
    where: { email },
    returning: true,
  });

  console.log(req.body);
  console.log(updatedUser);

  res.status(202).send(updatedUser);
};

module.exports = {
  createUser,
  loginUser,
  logOut,
  updateUser,
};
