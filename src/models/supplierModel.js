import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Supplier = db.define(
  "supplier",
  {
    id_supplier: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_supplier: DataTypes.STRING,
    alamat_supplier: DataTypes.STRING,
    no_telp: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default Supplier;
(async () => {
  await db.sync();
})();
