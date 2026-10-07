import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Kategori = db.define(
  "kategori",
  {
    id_kategori: {
      type: DataTypes.INTEGER, // atau DataTypes.STRING sesuai tipe data database kamu
      primaryKey: true,
      autoIncrement: true,
    },
    nama_kategori: DataTypes.STRING,
    id_parent: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  },
);

export default Kategori;

(async () => {
  await db.sync();
})();
