import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Order from "./Order.js";
import Product from "./productModel.js";

const OrderDetail = db.define(
  "order_detail",
  {
    id_detail: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    harga_satuan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);

Order.hasMany(OrderDetail, { foreignKey: "id_order", as: "items" });
OrderDetail.belongsTo(Order, { foreignKey: "id_order" });
OrderDetail.belongsTo(Product, { foreignKey: "id_product", as: "product" });

export default OrderDetail;
