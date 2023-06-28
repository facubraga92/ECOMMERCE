const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const db = require("./models");
const app = express();
const routes = require("./routes/index");

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("<h1>TRASH TALK</h1>");
});

db.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000 ");
  });
});
