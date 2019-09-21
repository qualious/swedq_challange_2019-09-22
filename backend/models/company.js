"use strict";
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "company",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1
      },
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      color: DataTypes.STRING
    },
    {}
  );
  Company.associate = db => {
    // associations can be defined here
    Company.hasMany(db.vehicle);
  };
  return Company;
};
