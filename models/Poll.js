const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Poll extends Model {}
//pulled this again from Challenge 14.
Poll.init(
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
            unique: 'poll'
          },
          content_type: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'poll'
          },
          content_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'poll'
          },
          rating: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
        },
        {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'poll'
        }
      );
      
      //export time!
      module.exports = Poll;
