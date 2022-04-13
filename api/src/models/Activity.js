const { DataTypes } = require('sequelize');

// Actividad Turística con las siguientes propiedades:
// ID
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('activity', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    difficulty: {
        type: DataTypes.ENUM('1','2','3','4','5'),
        allowNull: false,
    },
    duration: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    season: {
        type: DataTypes.ENUM('Summer','Autumn', 'Winter','Spring'),
        allowNull: false,
    },
    } //{freezeTableName: true}
    );
};