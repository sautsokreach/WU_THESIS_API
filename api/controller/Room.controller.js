import db from "../config/db.config.js";
//import isEmpty from "../config/hepler.js";

const getAllRoom = (req, res) => {
  db.query("SELECT * FROM room", (_, data) => {
    res.json(data.rows);
  });
};

export { getAllRoom };
