import { Sequelize } from "sequelize";

const db = new Sequelize("harafina", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default db;
