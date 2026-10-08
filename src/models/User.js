import { DataTypes } from "sequelize";
import db from "../config/database.js";

const User = db.define(
  "user",
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "owner", "pelanggan"),
      defaultValue: "pelanggan",
      allowNull: false,
    },
  },
  {
    tableName: "user",
    freezeTableName: true,
    timestamps: false,
  },
);

export default User;
