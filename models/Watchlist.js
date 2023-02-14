const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

class Watchlist extends Model { }

// set up fields and rules for Watchlist model

Watchlist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
        },
        content_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        content_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poster_path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        release_year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 2
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'watchlist'
    }
);

module.exports = Watchlist;
