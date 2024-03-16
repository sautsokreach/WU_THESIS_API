import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllCLass = (req, res) => {
  db.query("SELECT * FROM class", (err, data) => {
    res.json(data.rows);
  });
};

const getOneClass = (req, res) => {
  const id = req.params.id;
  const queryGetOneRoom = "Select * from class where class_id = $1";

  db.query(queryGetOneRoom, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data.rows);
  });
};

export { getAllCLass, getOneClass };
