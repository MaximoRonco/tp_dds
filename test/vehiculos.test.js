const request = require("supertest");
const app = require("../index");
const randomNum = Math.floor(Math.random() * 10000);

const vehiculoAlta = {
    IdVehiculo: 53,
    Modelo: "Power"+ randomNum.toString(),
    Cantidad: 11110,
    FechaLanzamiento: "2022-11-11",
    Activo: true,
}

const vehiculoM = {
    IdVehiculo: 1,
    Modelo: "T-CROSS",
    Cantidad: 11110,
    FechaLanzamiento: "2022-11-11",
    Activo: true,
}

describe ("GET /api/vehiculos", function (){
    it("Devolveria todos los vehiculos", async function(){
        const res = await request(app)
        .get("/api/vehiculos")
        .set("content-type", "application/json");
        expect(res.header["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(
            expect.arrayContaining([
            expect.objectContaining({
                IdVehiculo: expect.any(Number),
                Modelo: expect.any(String),
                Cantidad: expect.any(Number),
                FechaLanzamiento: expect.any(String),
                Activo: expect.any(Boolean),
                }),
            ])
        )    
    })
});

describe("GET /api/vehiculos/:id", function () {
    it("se espera UNO SOLO de los vehiculos", async function () {
        const res = await request(app)
        .get("/api/vehiculos/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
        expect.objectContaining({
        IdVehiculo: 1,
        })
    );
    });
});


describe("POST /api/vehiculos", () => {
    it("Deberia devolver el vehiculo que acabo de crear", async () => {
        const res = await request(app).post("/api/vehiculos").send(vehiculoAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
        expect.objectContaining({
            IdVehiculo: expect.any(Number),
            Modelo: expect.any(String),
            Cantidad: expect.any(Number),
            FechaLanzamiento: expect.any(String),
            Activo: expect.any(Boolean),
        })
    );
    });
});


describe("PUT /api/vehiculos/:id", () => {
    it("Deberia devolver el vehiculo con el id 1, modificado", async () => {
        const res = await request(app).put("/api/vehiculos/1").send(vehiculoM);
        expect(res.statusCode).toEqual(200);
    }, 25000);
});

describe("DELETE /api/vehiculos/:id", () => {
    it("Deberia devolver el vehiculo con el id 2 borrado", async () => {
        const res = await request(app).delete("/api/vehiculos/2");
        expect(res.statusCode).toEqual(200);


    });
});
