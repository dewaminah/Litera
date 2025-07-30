'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(User);
      Review.belongsTo(Book);
    }
  }
  Review.init({
    rating: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};