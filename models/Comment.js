const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }
//pulled this from challenge 14, thanks!
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        content_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          content_type: {
            type: DataTypes.STRING,
            allowNull: false
          }
        },
        {
          sequelize,
          freezeTableName: true,
          underscored: true,
          modelName: 'comment'
        }
      );
      
      module.exports = Comment;