import pg from "pg";

const { Pool } = pg;

//aws Server
const db = new Pool({
  user: "admin",
  host: "3.107.72.161",
  database: "university",
  password: "ASDasd123!@#",
  port: 5432,
  ssl: false,
});

db.connect((err) => {
  if (err) {
    return console.log(err);
  }
  return console.log("Database Connected!");
});

export default db;
