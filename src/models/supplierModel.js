import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Supplier = db.define("supplier",
{
    id_supplier: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nm_supp:{
        type: DataTypes.STRING,
        allowNull:false
    },

    alt_supp: {
        type: DataTypes.STRING,
        allowNull: false
    },

    no_telpSupp: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{ freezeTableName:true, timestamps:true });

export default Supplier;
