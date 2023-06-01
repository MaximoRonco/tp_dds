const db = require("aa-sqlite");

async function CrearBaseSinoExiste() {
    await db.open("./.data/baseDatos.db")
    
    let existe = false;
    let res = null;

    res = await db.get(
        `SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'personajesDBZs' `,
    []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
            `CREATE table personajesDBZs ( IdPersonaje INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, NivelDePoder INTEGER NOT NULL, fechaNacimiento text, Activo Boolean)`
        );
        console.log("tabla de personajes de DBZ creada!");
        await db.run(
            `insert into personajesDBZs values (1, 'Son Goku', 9000, '1963-04-16', 1), (2, 'Vegeta', 8500, '1968-02-12', 1), (3, 'Piccolo', 4200, 'null', 1), (4, 'Son Gohan', 3500, '1989-05-18', 1), (5, 'Trunks', 4000, '766-08-31', 1), (6, 'Goten', 3000, '767-03-28', 1), (7, 'Krillin', 1000, '1971-08-18', 1), (8, 'Bulma', 5, '1963-08-18', 1), (9, 'Android 18', 3500, '1987-11-12', 1), (10, 'Frieza', 12000, 'null', 1)`
        );
    };
    
    existe = false;
    res = null;
    
    res = await db.get(
        `SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'vehiculos' `,
    []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
            `CREATE table vehiculos ( IdVehiculo INTEGER PRIMARY KEY AUTOINCREMENT, Modelo text NOT NULL UNIQUE, Cantidad INTEGER NOT NULL, FechaLanzamiento text, Activo Boolean)`
        );
        console.log("tabla de vehiculos creada!");
        await db.run(
            `insert into vehiculos values (1,'Cruze',3000,'2015-12-12', 1), (2,'Onix',2500, '2012-09-09', 1), (3,'s10',6700, '2017-08-08', 1), (4,'Silverado',2200,'2009-10-10', 1), (5,'Camaro',5674,'1981-11-11', 1), (6,'Ranger',4567,'2014-07-02', 1), (7,'Mustang',7777,'1986-05-08', 1), (8,'Fiesta',64523,'2003-02-09', 1), (9,'Focus',7890,'2010-03-10', 1), (10,'Ka',67777,'2016-05-12', 1)`
        );
    };
    
    existe = false;
    res = null;
    res = await db.get(
        `SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'equipos' `,
    []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
            `CREATE table equipos ( IdEquipo INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, CantCopas INTEGER, fechaFundacion text, Activo Boolean)`
        );
        console.log("tabla de equipos creada!");
        await db.run(
            `insert into equipos values (1, 'Boca Juniors', 73, '1905-04-05', 1), (2, 'River Plate', 50, '1907-01-10', 1), (3, 'Racing', 23, '1906-10-20', 1), (4, 'Independiente', 42, '1910-02-28', 1), (5, 'San Lorenzo', 32, '1912-04-30', 1), (6, 'Estudiantes', 12, '1911-11-23', 1), (7, 'Velez Sarfield', 15, '1902-12-21', 1), (8, 'Argentinos Juniors', 15, '1913-08-18', 1), (9, 'Belgrano', 1, '1920-11-10', 1), (10, 'Talleres', 2,'1919-02-12' , 1)`
        );
    };
    
    //TINO
    existe = false;
    res = null;
    res = await db.get(
        `SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'comidas' `,
    []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
            `CREATE table comidas ( IdComida INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Peso INTEGER NOT NULL, FechaCreacion text, Activo Boolean)`
        );
        console.log("tabla de comidas creada!");
        await db.run(
            `insert into comidas values (1, 'Pizza', 500, '2023-05-30', 1),
            (2, 'Hamburguesa', 300, '2023-05-29', 1),
            (3, 'Ensalada', 200, '2023-05-30', 1),
            (4, 'Sushi', 400, '2023-05-28', 1),
            (5, 'Spaghetti', 350, '2023-05-31', 1),
            (6, 'Tacos', 250, '2023-05-30', 1),
            (7, 'Sopa', 150, '2023-05-29', 1),
            (8, 'Sandwich', 200, '2023-05-31', 1),
            (9, 'Pollo asado', 600, '2023-05-30', 1),
            (10, 'Sándwich de atún', 250, '2023-05-31', 1)`
        );
    };




    db.close()
}

module.exports = CrearBaseSinoExiste();