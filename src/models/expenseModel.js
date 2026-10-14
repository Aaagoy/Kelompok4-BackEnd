import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Supplier from "./supplierModel.js";

const Exspense = db.define(
  "pengeluaran",
  {
    id_pengeluaran: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    no_invoice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    id_supplier: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Supplier,
        key: "id_supplier",
      },
    },
    nama_barang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // TAMBAHKAN KOLOM HARGA DI SINI
    harga: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    total_pengeluaran: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Selesai", "Pending", "Batal"),
      allowNull: false,
      defaultValue: "Selesai",
    },
  },
  { freezeTableName: true, timestamps: false },
);

Exspense.belongsTo(Supplier, {
  foreignKey: "id_supplier",
  onDelete: "RESTRICT",
});
Supplier.hasMany(Exspense, { foreignKey: "id_supplier" });

export default Exspense;
