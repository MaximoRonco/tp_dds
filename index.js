const express = require("express");
const app = express();
require("./base-orm/sqlite-init"); 

app.get("/", (req, res) => {
    res.send("Backend Iniciado!");
});

app.use(express.json());

const personajesDBZ = require("./rutas/personajes");
app.use(personajesDBZ)

if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
    const port = process.env.PORT || 3000;   // en produccion se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  }
  module.exports = app; // para testing
  