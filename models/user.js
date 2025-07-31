const bcrypt = require('bcryptjs');
'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.Review);
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Email is Required!"
        },
        notEmpty: {
          args: true,
          msg: "Email is Required!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password is Required!"
        },
        notEmpty: {
          args: true,
          msg: "Password is Required!"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Role is Required!"
        },
        notEmpty: {
          args: true,
          msg: "Role is Required!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10); // salt ini random value buat hashing passnya
        user.password = await bcrypt.hash(user.password, salt); // hash yang ngubah pass ke random string yang ngga bisa dikembaliin ke pass aslinya
      }  // params instance ini si user, sebelum data passnya disimpan ke db, dia bakal di hash dulu biar lebih aman
        // console.log(instance);
     
        // instance.password = hash; // setelah berhasil, hasil hashnya disimpan dulu di instance.pass sebelum disimpan ke db
    }
  })
    return User;
};