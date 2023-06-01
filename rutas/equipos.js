const express = require("express");
const router = express.Router();
const db = require('../base-orm/sequelize-init')
const { Op, ValidationError } = require("sequelize");

router.get("/api/equipos", async function (req, res, next) {
  let data = await db.equipos.findAll ({
      attributes: ["IdEquipo","Nombre","CantCopas","fechaFundacion", "Activo"],
  });
  res.status(200).json(data);
})

router.get("/api/equipos/:id", async function (req, res, next) {
    let data = await db.equipos.findAll({
        attributes: ["IdEquipo","Nombre","CantCopas","fechaFundacion", "Activo"],
        where: {IdEquipo: req.params.id},
    });
    if (data.length > 0 ) res.status(200).json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
})


router.post("/api/equipos", async (req, res) => {
      let data = await db.equipos.create({
        Nombre: req.body.Nombre,
        CantCopas: req.body.CantCopas,
        fechaFundacion: req.body.fechaFundacion,
        Activo: req.body.Activo,
      });
      res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  });
  

  router.put("/api/equipos/:id", async (req, res) => {
      let item = await db.equipos.findOne({
        attributes: [
          "IdEquipo",
          "Nombre",
          "CantCopas",
          "fechaFundacion",
          "Activo",
        ],
        where: { IdEquipo: req.params.id },
      });
      if (!item) {
        res.status(404).json({ message: "equipo no encontrado" });
        return;
      }
      item.Nombre = req.body.Nombre;
      item.CantCopas = req.body.CantCopas;
      item.fechaFundacion = req.body.fechaFundacion;
      item.Activo = req.body.Activo;
      await item.save();
      res.sendStatus(200);
    
  });

  router.delete("/api/equipos/:id", async (req, res) => {
    let bajaFisica = false;
    if (bajaFisica) {
      // baja fisica
      let filasBorradas = await db.equipos.destroy({
        where: { IdEquipo: req.params.id },
      });
      if (filasBorradas == 1) res.sendStatus(200);
      else res.sendStatus(404);
    } else {
      // baja logica
        let data = await db.sequelize.query(
          "UPDATE equipos SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdEquipo = :IdEquipo",
          {
            replacements: { IdEquipo: +req.params.id },
          }
        );
        res.sendStatus(200);
      } 
    }
  );
  
  
module.exports = router