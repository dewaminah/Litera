'use strict';
const {
  Model
} = require('sequelize');

const bcyrpt = require('bcryptjs');
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
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      async beforeCreate(instance) { // params instance ini si user, sebelum data passnya disimpan ke db, dia bakal di hash dulu biar lebih aman
        // console.log(instance);
        
        const salt = await bcrypt.genSalt(10); // salt ini random value buat hashing passnya
        const hash = await bcrypt.hash(instance.password, salt); // hash yang ngubah pass ke random string yang ngga bisa dikembaliin ke pass aslinya
        instance.password = hash; // setelah berhasil, hasil hashnya disimpan dulu di instance.pass sebelum disimpan ke db
      }
    },

    sequelize,
    modelName: 'User',
  });
  return User;
};