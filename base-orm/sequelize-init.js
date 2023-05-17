const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize ("sqlite:" + "./.data/baseDatos.db")

const personajesDBZ = sequelize.define(
    "personajesDBZs",
    { IdPersonaje: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notNull: {
                  args: true,
                  msg: "IdArticuloFamilia es requerido"
                },
            },
        },
        Nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido",
                },
            },
        },

        NivelDePoder: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'El nivel de poder es requerido',
                },
            },
        },

        fechaNacimiento: {
            type: DataTypes.DATEONLY
        },

        Activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
              notNull: {
                args: true,
                msg: "Activo es requerido",
              }
            }
          },
      
    },

    { hooks: {
            beforeValidate: function (personajesDBZ, options) {
            if (typeof personajesDBZ.Nombre === "string") {
                personajesDBZ.Nombre = personajesDBZ.Nombre.toUpperCase().trim();
            }
            },
        },
        timestamps: false,
    },

);

module.exports = {
    sequelize,
    personajesDBZ,
};