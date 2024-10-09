import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllScheduleDays = (req, res) => {
  db.query(`select * from schedule_day sd left join subject s on s.subject_id = sd.subject_id left join professor p on p.professor_id = sd.professor_id left join room r on r.room_id = sd.room_id where schedule_id = ${req.params.id}  `, (err, data) => {
    res.json(data.rows);
  });
};

const getOneScheduleDay = (req, res) => {
  const id = req.params.id;
  const queryGetOneSubject = "Select * from subject where subject_id = $1";

  db.query(queryGetOneSubject, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data.rows);
  });
};

const createScheduleDay = (req, res) => {
  const getScheduleId = req.body.schedule_id;
  const getSubjectId = req.body.subject_id;
  const getProfessorId = req.body.professor_id;
  const getRoomId = req.body.room_id;
  const getWeekDay = req.body.weekDay;

  if (isEmpty(getScheduleId)) {
    return res.json("Please Fill getSubjectId");
  }
  if (isEmpty(getSubjectId)) {
    return res.json("Please Fill getSubjectId");
  }
  if (isEmpty(getProfessorId)) {
    return res.json("Please Fill getProfessorId");
  }
  if (isEmpty(getRoomId)) {
    return res.json("Department getRoomId");
  }
  if (isEmpty(getWeekDay)) {
    return res.json("Department getWeekDay");
  }

  const queryCreateRoom =
    "INSERT INTO schedule_day ( schedule_id,subject_id, professor_id, room_id,weekDay) VALUES ($1,$2,$3,$4,$5)";

  db.query(
    queryCreateRoom,
    [getScheduleId,getSubjectId, getProfessorId, getRoomId,getWeekDay],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Schedule Day Has Been Created!");
    }
  );
};

const editScheduleDay = (req, res) => {
  const getIdSubject = req.params.id;
  const getSubjectName = req.body.subject_name;
  const getSubjectCode = req.body.subject_code;
  const getDepartmentId = 1;

  if (isEmpty(getSubjectName)) {
    return res.json("Please Fill Subject Name");
  }
  if (isEmpty(getSubjectCode)) {
    return res.json("Please Fill Subject Code");
  }
  if (isEmpty(getDepartmentId)) {
    return res.json("Department ID Not Found!");
  }

  const queryEditSubject =
    "update subject set subject_name=$1, subject_code=$2, department_id=$3 WHERE subject_id = $4";

  db.query(
    queryEditSubject,
    [getSubjectName, getSubjectCode, getDepartmentId, getIdSubject],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Subject Has Been Edited!");
    }
  );
};

const deleteScheduleDay = (req, res) => {
  const getIdSubject = req.params.id;

  db.query(
    "Delete from subject where subject_id = $1",
    [getIdSubject],
    (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Subject Has Been Deleted!");
    }
  );
};

export {
    getAllScheduleDays,
  //getOneSubject,
  createScheduleDay,
  editScheduleDay,
  deleteScheduleDay,
};
