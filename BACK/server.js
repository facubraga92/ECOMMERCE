const express = require('express')
const morgan = require('morgan')
const db = require('./models')

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
