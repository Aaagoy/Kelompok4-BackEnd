import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

// Header pesanan (satu baris = satu antrean/transaksi)
const Order = db.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    no_antrean: { type: DataTypes.STRING(20), allowNull: false },
    waktu: { type: DataTypes.STRING(16), allowNull: false }, // "YYYY-MM-DD HH:mm"
    nama_pelanggan: { type: DataTypes.STRING, allowNull: false },
    metode_pembayaran: { type: DataTypes.STRING(30), defaultValue: "Tunai" },
    total_belanja: { type: DataTypes.DOUBLE, defaultValue: 0 },
    status: { type: DataTypes.STRING(20), defaultValue: "Menunggu" },
  },
  { tableName: "orders", freezeTableName: true },
);

// Rincian item per pesanan
const OrderItem = db.define(
  "order_item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    id_produk: { type: DataTypes.INTEGER, allowNull: true },
    nama_barang: { type: DataTypes.STRING, allowNull: false },
    qty: { type: DataTypes.INTEGER, allowNull: false },
    harga: { type: DataTypes.DOUBLE, allowNull: false },
    subtotal: { type: DataTypes.DOUBLE, allowNull: false },
  },
  { tableName: "order_items", freezeTableName: true },
);

// Relasi: alias "items" harus sama dengan yang dipakai di include controller
Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  as: "items",
  onDelete: "CASCADE",
});
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

export { Order, OrderItem };
export default Order;
