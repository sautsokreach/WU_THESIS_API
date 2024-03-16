import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllRoom = (req, res) => {
  db.query("SELECT * FROM room", (err, data) => {
    res.json(data.rows);
  });
};

const getOneRoom = (req, res) => {
  const id = req.params.roomNumber;
  const queryGetOneRoom = "Select * from room where room_number = $1";

  db.query(queryGetOneRoom, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data.rows);
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

const editRoom = (req, res) => {
  const getIdRoom = req.params.id;
  const getRoomNumber = req.body.roomNumber;
  const getStatus = req.body.status;
  const getComment = req.body.comment;

  // console.log(getIdRoom);
  // console.log(getRoomNumber);
  // console.log(getStatus);
  // console.log(getComment);

  if (isEmpty(getRoomNumber)) {
    return res.json("Please Fill Room Number");
  }
  if (isEmpty(getStatus)) {
    return res.json("Please Select Status");
  }

  const queryEditRoom =
    "update room set room_number = $1 , status = $2, comment =$3 WHERE room_id = $4";

  db.query(
    queryEditRoom,
    [getRoomNumber, getStatus, getComment, getIdRoom],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Room Has Been Edited!");
    }
  );
};
export { getAllRoom, createRoom, editRoom, getOneRoom };
