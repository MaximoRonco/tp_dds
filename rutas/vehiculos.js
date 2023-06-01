const express = require("express");
const router = express.Router();
const db = require('../base-orm/sequelize-init')
const { Op, ValidationError } = require("sequelize");

router.get("/api/vehiculos", async function (req, res, next) {
    let data = await db.vehiculos.findAll ({
        attributes: ["IdVehiculo","Modelo","Cantidad","FechaLanzamiento", "Activo"],
    });
    res.status(200).json(data);
})

router.get("/api/vehiculos/:id", async function (req, res, next) {
    let data = await db.vehiculos.findAll({
        attributes: ["IdVehiculo","Modelo","Cantidad","FechaLanzamiento", "Activo"],
        where: {IdVehiculo: req.params.id},
    });
    if (data.length > 0 ) res.status(200).json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
})



router.post("/api/vehiculos", async (req, res) => {
        let data = await db.vehiculos.create({
        Modelo: req.body.Modelo,
        Cantidad: req.body.Cantidad,
        FechaLanzamiento: req.body.FechaLanzamiento,
        Activo: req.body.Activo,
    });
      res.status(200).json(data.dataValues); // devolvemos el registro agregado!
});


router.put("/api/vehiculos/:id", async (req, res) => {
    let item = await db.vehiculos.findOne({
        attributes: [
            "IdVehiculo",
            "Modelo",
            "Cantidad",
            "FechaLanzamiento",
            "Activo",
        ],
        where: { IdVehiculo: req.params.id },
    });
    if (!item) {
        res.status(404).json({ message: "Vehiculo no encontrado" });
        return;
    }
    item.Modelo = req.body.Modelo;
    item.Cantidad = req.body.Cantidad;
    item.FechaLanzamiento = req.body.FechaLanzamiento;
    item.Activo = req.body.Activo;
    await item.save();
    res.sendStatus(200);
    
});

router.delete("/api/vehiculos/:id", async (req, res) => {
    let bajaFisica = false;
    if (bajaFisica) {
      // baja fisica
    let filasBorradas = await db.vehiculos.destroy({
        where: { IdVehiculo: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
    } else {
      // baja logica
        let data = await db.sequelize.query(
            "UPDATE vehiculos SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdVehiculo = :IdVehiculo",
        {
            replacements: { IdVehiculo: +req.params.id },
        }
        );
        res.sendStatus(200);
    } 
    }
);


module.exports = router