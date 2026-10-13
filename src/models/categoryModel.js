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
<<<<<<< HEAD
    deskripsi: DataTypes.STRING,
=======
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f
    id_parent: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
    timestamps: false, // jika tidak ada kolom createdAt dan updatedAt
  },
);

export default Kategori;

(async () => {
  await db.sync();
})();
