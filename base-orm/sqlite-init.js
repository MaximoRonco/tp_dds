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
    db.close()
}

module.exports = CrearBaseSinoExiste();