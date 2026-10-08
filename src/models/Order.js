import { DataTypes } from "sequelize";
import db from "../config/database.js";
import User from "./User.js";

const Order = db.define(
  "order",
  {
    id_order: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nomor_nota: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    metode_pembayaran: {
      type: DataTypes.ENUM("cash", "transfer"),
      defaultValue: "cash",
    },
    bayar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kembalian: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  },
);

Order.belongsTo(User, { foreignKey: "id_user" });

export default Order;
