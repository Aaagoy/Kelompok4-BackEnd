import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Produk = db.define(
  "produk",
  {
    id_produk: {
      type: DataTypes.INTEGER, // atau DataTypes.STRING sesuai tipe data database kamu
      primaryKey: true,
      autoIncrement: true,
    },
    nama_produk: DataTypes.STRING,
    sku: DataTypes.STRING,
    stok: DataTypes.NUMBER,
    harga: DataTypes.FLOAT,
    deskripsi: DataTypes.STRING,
    id_kategori: DataTypes.NUMBER,
  },
  {
    freezeTableName: true,
  },
);

export default Produk;

//buat functiion untuk membca tabel, gunakan async
(async () => {
  await db.sync();
})();
