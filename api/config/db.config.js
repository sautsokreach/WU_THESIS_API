import pg from "pg";

const { Pool } = pg;

//aws Server
const db = new Pool({
  user: "sautsokreach",
  host: "ep-rough-rice-922718.ap-southeast-1.aws.neon.tech",
  database: "university_schedule",
  password: "lP2dXvp6Dbqi",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // You may need to set this to true in a production environment with a valid certificate
  },
});

db.connect((err) => {
  if (err) {
    return console.log(err);
  }
  return console.log("Database Connected!");
});

export default db;
