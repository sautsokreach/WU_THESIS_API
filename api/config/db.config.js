const { Pool } = require("pg");

const db = new Pool({
  user: "sautsokreach",
  host: "ep-rough-rice-922718.ap-southeast-1.aws.neon.tech",
  database: "university_schedule",
  password: "sODHvLXo1UA5",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // You may need to set this to true in a production environment with a valid certificate
  },
});

db.connect();

module.exports = db;
