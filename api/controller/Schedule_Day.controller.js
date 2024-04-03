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

  const queryCreateRoom =
    "INSERT INTO subject ( subject_name, subject_code, department_id) VALUES ($1,$2,$3)";

  db.query(
    queryCreateRoom,
    [getSubjectName, getSubjectCode, getDepartmentId],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Subject Has Been Created!");
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
