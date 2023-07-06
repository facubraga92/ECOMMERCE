const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const db = require("./models");
const app = express();
const cors = require("cors");
const routes = require("./routes/index");
const { DB_PORT } = require("./config");
const fillFakeData = require("./utils/fakeData");


/**
 * Middleware para registrar las solicitudes y respuestas en la consola durante el desarrollo.
 * 
 * @name morgan
 * @function
 * @memberof module:app
 */
app.use(morgan("dev"));


/**
 * Middleware para analizar los datos JSON de la solicitud.
 * 
 * @name express.json
 * @function
 * @memberof module:app
 */

app.use(express.json());

/**
 * Middleware para analizar las cookies en las solicitudes.
 * 
 * @name cookieParser
 * @function
 * @memberof module:app
 */
app.use(cookieParser());

/**
 * Middleware para habilitar CORS y configurar las opciones de origen y credenciales.
 * 
 * @name cors
 * @function
 * @memberof module:app
 * @param {Object} options - Opciones de configuración de CORS.
 */

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

//Para llenar de datos falsos Products y Products_variants
// fillFakeData();


/**
 * Middleware para manejar las rutas de la API.
 * 
 * @name routes
 * @type {Router}
 * @memberof module:app
 */

app.use("/api", routes);


/**
 * Ruta de inicio para verificar si el servidor está funcionando correctamente.
 * 
 * @name GET /
 * @function
 * @memberof module:app
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */



app.get("/", (req, res) => {
  res.send("<h1>TRASH TALK</h1>");
});

/**
 * Sincronizar la base de datos y escuchar en el puerto especificado.
 * 
 * @name db.sync
 * @function
 * @memberof module:app
 * @param {Object} options - Opciones de sincronización de la base de datos.
 */

db.sync({ force: false }).then(() => {
  app.listen(DB_PORT, () => {
    console.log(`Servidor escuchando en el puerto ${DB_PORT}`);
  });
});
