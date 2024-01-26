const { Pool }  = require("pg");

// production database nodejs course j2
// const db = mysql.createConnection({
//     host : "byg0tg9umzt3zdxevlmj-mysql.services.clever-cloud.com",
//     database : "byg0tg9umzt3zdxevlmj",
//     user : "urnz8r2soednltnv",
//     password : "GbbwveSR33Gl97WMcq7j"
// })

// production database demo_dbg2
// const db = mysql.createConnection({
//     host : "blrxi9uq7wz38fcuiboy-mysql.services.clever-cloud.com",
//     database : "blrxi9uq7wz38fcuiboy",
//     user : "udv4hrqsafdw8lsa",
//     password : "oPDwjdOTgILh9Si5mR5b"
// })

//aws server

const db = new Pool({
    user: 'sautsokreach',
    host: 'ep-rough-rice-922718.ap-southeast-1.aws.neon.tech',
    database: 'university_schedule',
    password: 'sODHvLXo1UA5',
    port: 5432,
    ssl: {
        rejectUnauthorized: false, // You may need to set this to true in a production environment with a valid certificate
      },
  });
// const db = mysql.createConnection({
//     host : "localhost",
//     database : "nodejs_g2",
//     user : "root",
//     password : ""
// })
db.connect();

module.exports = db;

