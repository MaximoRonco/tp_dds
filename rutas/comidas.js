const express = require("express");
const router = express.Router();
const db = require('../base-orm/sequelize-init')

router.get("/api/comidas", async function (req, res, next) {
  let data = await db.comidas.findAll ({
      attributes: ["IdComida","Nombre","Peso","FechaCreacion", "Activo"],
  });
  res.status(200).json(data);
})

router.get("/api/comidas/:id", async function (req, res, next) {
    let data = await db.comidas.findAll({
        attributes: ["IdComida","Nombre","Peso","FechaCreacion", "Activo"],
        where: {IdComida: req.params.id},
    });
    if (data.length > 0 ) res.status(200).json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
})


router.post("/api/comidas", async (req, res) => {
      let data = await db.comidas.create({
        Nombre: req.body.Nombre,
        Peso: req.body.Peso,
        FechaCreacion: req.body.FechaCreacion,
        Activo: req.body.Activo,
      });
      res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  });
  

  router.put("/api/comidas/:id", async (req, res) => {
      let item = await db.comidas.findOne({
        attributes: [
          "IdComida",
          "Nombre",
          "Peso",
          "FechaCreacion",
          "Activo",
        ],
        where: { IdComida: req.params.id },
      });
      if (!item) {
        res.status(404).json({ message: "Comida no encontrada" });
        return;
      }
      item.Nombre = req.body.Nombre;
      item.Peso = req.body.Peso;
      item.FechaCreacion = req.body.FechaCreacion;
      item.Activo = req.body.Activo;
      await item.save();
      res.sendStatus(200);
    
  });

  router.delete("/api/comidas/:id", async (req, res) => {
    let bajaFisica = false;
    if (bajaFisica) {
      // baja fisica
      let filasBorradas = await db.comidas.destroy({
        where: { IdComida: req.params.id },
      });
      if (filasBorradas == 1) res.sendStatus(200);
      else res.sendStatus(404);
    } else {
      // baja logica
        let data = await db.sequelize.query(
          "UPDATE comidas SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdComida = :IdComida",
          {
            replacements: { IdComida: +req.params.id },
          }
        );
        res.sendStatus(200);
      } 
    }
  );
  
  
module.exports = router