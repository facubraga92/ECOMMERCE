import express from "express";
import morgan from "morgan";
import db from "./config/db.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

/* app.use("/api", routes); */

app.get("/", (req, res) => {
  res.send("<h1>TRASH TALK</h1>");
});

db.sync({ force: true }).then(() => {
  app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000 ");
  });
});
