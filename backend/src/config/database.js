// // import mysql from "mysql2/promise";
// import { Sequelize } from "sequelize";

// // async function createDB(){
// //     try{
// //         let con = await mysql.createConnection({
// //             host: "localhost",
// //             user: "root",
// //             password: ""
// //         })

// //         await con.query('CREATE DATABASE IF NOT EXISTS harafina');
// //         console.log("Database telah dibuat dan siap digunakan!");
// //         await con.end();
// //     }catch(error){
// //         console.error('Database tidak dibuat, cek error :',error);
// //     }
// // }

// // await createDB();

// function db() {
//   const con = new Sequelize("harafina", "root", "", {
//     host: "localhost",
//     dialect: "mysql",
//     logging: false,
//   });
//   return con;
// }

// export default db();

import { Sequelize } from "sequelize";

const db = new Sequelize("harafina", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default db;
