const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: {type: DataTypes.STRING,allowNull: true,unique: true,validate: { notEmpty: false }},
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: true },
  dob: { type: DataTypes.DATEONLY, allowNull: true },
  addresses: { type: DataTypes.JSON, allowNull: false, defaultValue: [] }
}, {
  tableName: 'user',
  timestamps: true, 
});

module.exports = User;
