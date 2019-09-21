"use strict";
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define(
    "vehicle",
    {
      id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
      registrationNumber: DataTypes.STRING
    },
    {}
  );
  Vehicle.associate = db => {
    Vehicle.belongsTo(db.company);
  };
  return Vehicle;
};
