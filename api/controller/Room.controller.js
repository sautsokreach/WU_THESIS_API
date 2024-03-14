import db from "../config/db.config.js";
//import isEmpty from "../config/hepler.js";

const getAllRoom = (req, res) => {
  db.query("SELECT * FROM room", (err, data) => {
    res.json(data.rows);
  });
};

const createRoom = (req, res) => {
  const getRoomNumber = req.body.roomNumber;
  const getStatus = req.body.status;
  const getComment = req.body.comment;

  const queryCreateRoom =
    "INSERT INTO room (room_number,status,comment) VALUES ($1,$2,$3)";

  db.query(
    queryCreateRoom,
    [getRoomNumber, getStatus, getComment],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Room Has Been Created!");
    }
  );
};

const updateRoom = (req, res) => {
  const getRoomNumber = req.body.roomNumber;
  const getStatus = req.body.status;
  const getComment = req.body.comment;

  const queryUpdateRoom =
    "update room set room_num = $1 , status = $2, comment =$3 WHERE room_id = $4";

  db.query();
};
export { getAllRoom, createRoom, updateRoom };
