const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const db = require("./models");
const app = express();
const cors = require("cors");
const routes = require("./routes/index");
const { DB_PORT } = require("./config");
const fillFakeData = require("./utils/fakeData");

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

//Para llenar de datos falsos Products y Products_variants
// fillFakeData();

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("<h1>TRASH TALK</h1>");
});

db.sync({ force: false }).then(() => {
  app.listen(DB_PORT, () => {
    console.log(`Servidor escuchando en el puerto ${DB_PORT}`);
  });
});
