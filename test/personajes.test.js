const request = require("supertest");
const app = require("../index");
const randomNum = Math.floor(Math.random() * 10000);

const personajeAlta = {
    IdPersonaje: 199,
    Nombre: "NARUTO"+ randomNum.toString(),
    NivelDePoder: 11110,
    fechaNacimiento: "2022-11-11",
    Activo: true,
  }

const personajeM = {
    IdPersonaje: 1,
    Nombre: "GENKA",
    NivelDePoder: 11110,
    fechaNacimiento: "2022-11-11",
    Activo: true,
  }

describe ("GET /api/personajesDBZ", function (){
    it("Devolveria todos los personajes de DBZ", async function(){
        const res = await request(app)
        .get("/api/personajesDBZ")
        .set("content-type", "application/json");
        expect(res.header["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(
            expect.arrayContaining([
              expect.objectContaining({
                IdPersonaje: expect.any(Number),
                Nombre: expect.any(String),
                NivelDePoder: expect.any(Number),
                fechaNacimiento: expect.any(String),
                Activo: expect.any(Boolean),
                }),
            ])
        )    
    })
});

describe("GET /api/personajesDBZ/:id", function () {
    it("se espera UNO SOLO de los personajes", async function () {
      const res = await request(app)
      .get("/api/personajesDBZ/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdPersonaje: 1,
        })
      );
    });
  });
  

  describe("POST /api/personajesDBZ", () => {
    it("Deberia devolver el personaje que acabo de crear", async () => {
      const res = await request(app).post("/api/personajesDBZ").send(personajeAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdPersonaje: expect.any(Number),
          Nombre: expect.any(String),
          NivelDePoder: expect.any(Number),
          fechaNacimiento: expect.any(String),
          Activo: expect.any(Boolean),
        })
      );
    });
  });


describe("PUT /api/personajesDBZ/:id", () => {
    it("Deberia devolver el personaje con el id 1, modificado", async () => {
      const res = await request(app).put("/api/personajesDBZ/1").send(personajeM);
      expect(res.statusCode).toEqual(200);
    }, 25000);
  });
  
  describe("DELETE /api/personajesDBZ/:id", () => {
    it("Deberia devolver el personaje con el id 2 borrado", async () => {
      const res = await request(app).delete("/api/personajesDBZ/2");
      expect(res.statusCode).toEqual(200);

  
    });
  });
  