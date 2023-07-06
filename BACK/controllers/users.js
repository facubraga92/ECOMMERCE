const { ADMIN_CODE } = require("../config");
const { generateToken } = require("../config/tokens");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");

/**
 * Crea un nuevo usuario.
 *
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON que indica el éxito del registro.
 * @throws {Error} - Error en el registro del usuario.
 */

const createUser = async (req, res) => {
  try {
    const { name, email, password, address, phone, code } = req.body;

    let user = await Users.findOne({ where: { email: email } });
    if (user) {
      return res
        .status(401)
        .send("Ya existe un usuario registrado con ese email.");
    }

    if (code === ADMIN_CODE) {
      const createdUser = await Users.create({ ...req.body, role: "admin" });
      return res
        .send({
          success: true,
          message: `Usuario con privilegios de Administrador creado con éxito: ${createdUser.email}`,
        })
        .status(201);
    } else if (code === "") {
      const createdUser = await Users.create(req.body);
      return res
        .send({
          success: true,
          message: `Usuario creado con éxito: ${createdUser.email}`,
        })
        .status(201);
    } else {
      return res
        .send({
          success: false,
          message:
            "Código incorrecto. Introduce un código válido o deja el campo en blanco.",
        })
        .status(400);
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Hubo un error en el registro",
    });
  }
};

/**
 * Inicia sesión de un usuario.
 *
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON que contiene los datos del usuario y un token de autenticación.
 */

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
        id: user.id,
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

/**
 * Cierra la sesión de un usuario.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */

const logOut = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

/**
 * Actualiza la información de un usuario.
 *
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON que contiene los datos actualizados del usuario.
 */

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

/**
 * Cambia el rol de un usuario entre "admin" y "customer".
 *
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON que indica el éxito del cambio de rol.
 * @throws {Error} - Error al cambiar el rol del usuario.
 */

const changeUserRole = async (req, res) => {
  const id = req.params.id;
  let user = await Users.findByPk(id);
  if (!user) {
    res.status(404).send("Usuario no encontrado");
  }
  try {
    user.role == "admin" ? (user.role = "customer") : (user.role = "admin");

    user.save();
    console.log(user.role);
    res.send(
      `Role del usuario con id:${id} cambiado exitosamente a ${user.role}`
    );
  } catch (error) {
    res
      .status(500)
      .send(
        "Ha ocurrido un error al intentar cambiar el role del usuario especificado."
      );
  }
};

/**
 * Obtiene todos los usuarios .
 *
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON que contiene todos los usuarios.
 * @throws {Error} - Error al obtener los usuarios.
 */

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email", "address", "phone", "role"],
    });

    res.send(users);
  } catch (error) {
    res.status(500).send("No se encontraron usuarios, error del servidor.");
  }
};

/**
 * Elimina un usuario.
 *
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON que indica el éxito de la eliminación del usuario.
 * @throws {Error} - Error al eliminar el usuario.
 */

const deleteUser = async (req, res) => {
  const id = req.params.id;
  let user = await Users.findByPk(id);
  if (!user) {
    return res.status(404).send("Usuario no encontrado");
  }
  try {
    await user.destroy();
    res.status(202).send(`Usuario con id: ${user.id} eliminado exitosamente.`);
  } catch (error) {
    res
      .status(500)
      .send("Ha ocurrido un error al intentar eliminar el usuario.");
  }
};

module.exports = {
  createUser,
  loginUser,
  logOut,
  updateUser,
  changeUserRole,
  getAllUsers,
  deleteUser,
};
