import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Exspense = db.define("pengeluaran",
{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    nama_barang: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    nama_supplier: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    harga: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    
    satuan: {
        type: DataTypes.STRING,
        allowNull: false
    },

    total_pengeluaran:{
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },

    tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},{ freezeTableName:true,timestamps:false });

export default Exspense;