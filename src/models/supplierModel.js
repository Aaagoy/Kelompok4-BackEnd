<<<<<<< HEAD
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
    no_telp: DataTypes.STRING.DataTypes,
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
=======
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
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f
