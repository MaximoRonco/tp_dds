const request = require("supertest");
const app = require("../index");
const randomNum = Math.floor(Math.random() * 10000);

const equiposAlta = {
    IdEquipo: 25,
    Nombre: "Patronato"+ randomNum.toString(),
    CantCopas: 2,
    fechaFundacion: "1930-01-11",
    Activo: true,
  }

const equiposM = {
    IdEquipo: 1,
    Nombre: "Instituto",
    CantCopas: 3,
    fechaFundacion: "1911-02-23",
    Activo: true,
  }

describe ("GET /api/equipos", function (){
    it("Devolveria todos los equipos", async function(){
        const res = await request(app)
        .get("/api/equipos")
        .set("content-type", "application/json");
        expect(res.header["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(
            expect.arrayContaining([
              expect.objectContaining({
                IdEquipo: expect.any(Number),
                Nombre: expect.any(String),
                CantCopas: expect.any(Number),
                fechaFundacion: expect.any(String),
                Activo: expect.any(Boolean),
                }),
            ])
        )    
    })
});

describe("GET /api/equipos/:id", function () {
    it("se espera UNO SOLO de los equipos", async function () {
      const res = await request(app)
      .get("/api/equipos/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdEquipo: 1,
        })
      );
    });
  });
  
  describe("POST /api/equipos", () => {
    it("Deberia devolver el equipos que acabo de crear", async () => {
      const res = await request(app).post("/api/equipos").send(equiposAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdEquipo: expect.any(Number),
          Nombre: expect.any(String),
          CantCopas: expect.any(Number),
          fechaFundacion: expect.any(String),
          Activo: expect.any(Boolean),
        })
      );
    });
  });


describe("PUT /api/equipos/:id", () => {
    it("Deberia devolver el equipos con el id 1, modificado", async () => {
      const res = await request(app).put("/api/equipos/1").send(equiposM);
      expect(res.statusCode).toEqual(200);
    }, 25000);
  });
  
  describe("DELETE /api/equipos/:id", () => {
    it("Deberia devolver el equipo con el id 2 borrado", async () => {
      const res = await request(app).delete("/api/equipos/2");
      expect(res.statusCode).toEqual(200);

  
    });
  });