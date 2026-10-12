import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Exspense = db.define("pengeluaran",
{
    id_pengeluaran: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    no_invoice:{
        type: DataTypes.STRING,
        allowNull:false
    },

    tanggal: {
        type: DataTypes.DATE,
        allowNull: false
    },

    nama_supplier: {
        type: DataTypes.STRING,
        allowNull: false
    },

    nama_barang: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    total_pengeluaran: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },

    status:{
        type: DataTypes.ENUM("Lunas", "Bayar Dimuka", "Belum Lunas"),
        allowNull: false
    },

},{ freezeTableName:true, timestamps:false });

export default Exspense;