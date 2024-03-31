import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllRoom = (req, res) => {
  db.query("SELECT * FROM room  where status <> 'delete'", (err, data) => {
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
  const getRoomNumber = req.body.room_number;
  const getStatus = req.body.status;
  const getComment = req.body.comment;
  const getFloor = req.body.floor;
  const getSeat = req.body.seat;

  const queryCreateRoom =
    "INSERT INTO room (room_number,status,comment,floor,seat) VALUES ($1,$2,$3,$4,$5)";

  db.query(
    queryCreateRoom,
    [getRoomNumber, getStatus, getComment, getFloor, getSeat],
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
  const getRoomNumber = req.body.room_number;
  const getStatus = req.body.status;
  const getComment = req.body.comment;
  const getFloor = req.body.floor;
  const getSeat = req.body.seat;

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
    "update room set room_number = $1 , status = $2, comment =$3,floor = $4, seat = $5 WHERE room_id = $6";

  db.query(
    queryEditRoom,
    [getRoomNumber, getStatus, getComment, getFloor, getSeat, getIdRoom],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Room Has Been Edited!");
    }
  );
};

const deleteRoom = (req, res) => {
  const getIdRoom = req.params.id;

  if (isEmpty(getIdRoom)) {
    return res.json("Can't Get ID Room");
  }

  db.query(
    "update room set status = 'delete'   WHERE room_id = $1",
    [getIdRoom],
    (err, data) => {
      console.log(err);
      console.log(data);
      if (err) return res.json(err);

      return res.status(200).json("Room Has Been Deleted!");
    }
  );
};

const getAvailableRoom = (req, res) => {
  const weekDay = req.body.day;
  const shift = req.body.shift;
  const date = req.body.date;

  console.log(weekDay, shift, date);

  const queryAvailableRoom = `SELECT * FROM room r where not exists (select 1 from schedule_day sd 
      join schedule s on s.schedule_id = sd.schedule_id 
      where sd.weekday = $1 and s.shift = $2 and CAST($3 AS DATE)
      < term_end   and sd.room_id = r.room_id  ) and r.status = 'available'`;

  db.query(queryAvailableRoom, [weekDay, shift, date], (err, data) => {
    if (err) return res.json(err);
    return res.json(data.rows);
  });
};

const getAvailableRooms = (req, res) => {};

export {
  getAllRoom,
  createRoom,
  editRoom,
  getOneRoom,
  deleteRoom,
  getAvailableRoom,
  getAvailableRooms,
};
