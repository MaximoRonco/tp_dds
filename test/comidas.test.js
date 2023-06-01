const request = require("supertest");
const app = require("../index");
const randomNum = Math.floor(Math.random() * 10000);

const comidaAlta = {
    IdComida: 299,
    Nombre: "Cappelletini"+ randomNum.toString(),
    Peso: 11,
    FechaCreacion: "2022-11-11",
    Activo: true,
  }

const comidaM = {
    IdComida: 1,
    Nombre: "EMPANADAS",
    Peso: 111,
    FechaCreacion: "2022-11-11",
    Activo: true,
  }

describe ("GET /api/comidas", function (){
    it("Devolveria todas las comidas", async function(){
        const res = await request(app)
        .get("/api/comidas")
        .set("content-type", "application/json");
        expect(res.header["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(
            expect.arrayContaining([
              expect.objectContaining({
                IdComida: expect.any(Number),
                Nombre: expect.any(String),
                Peso: expect.any(Number),
                FechaCreacion: expect.any(String),
                Activo: expect.any(Boolean),
                }),
            ])
        )    
    })
});

describe("GET /api/comidas/:id", function () {
    it("se espera UNO SOLO de las comidas", async function () {
      const res = await request(app)
      .get("/api/comidas/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdComida: 1,
        })
      );
    });
  });
  

  describe("POST /api/comidas", () => {
    it("Deberia devolver la comida que acabo de crear", async () => {
      const res = await request(app).post("/api/comidas").send(comidaAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdComida: expect.any(Number),
          Nombre: expect.any(String),
          Peso: expect.any(Number),
          FechaCreacion: expect.any(String),
          Activo: expect.any(Boolean),
        })
      );
    });
  });


describe("PUT /api/comidas/:id", () => {
    it("Deberia devolver la comida con el id 1, modificado", async () => {
      const res = await request(app).put("/api/comidas/1").send(comidaM);
      expect(res.statusCode).toEqual(200);
    }, 25000);
  });
  
  describe("DELETE /api/comidas/:id", () => {
    it("Deberia devolver la comida con el id 2 borrado", async () => {
      const res = await request(app).delete("/api/comidas/2");
      expect(res.statusCode).toEqual(200);

  
    });
  });