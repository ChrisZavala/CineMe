const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const bcrypt = require('bcrypt');

class User extends Model {
//check passwordlogin
checkPassword(loginPW) {
    return bcrypt.compareSync(loginPW, this.password);
}
}
  
// set up fields and rules for User model

User.init(
    {id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
    },

    hooks: {
        //set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        //set up beforeUpdate lifeCycle "hook" functionality
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
}
);
module.exports = User;