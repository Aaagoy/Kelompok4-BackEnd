import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Exspense = db.define("expense",
{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    keterangan: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    jumlah: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
},{ freezeTableName:true,timestamps:false });

export default Exspense;