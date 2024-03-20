import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllProfessor_Schedule = (req, res) => {
  db.query("SELECT * FROM professor_schedule", (err, data) => {
    res.json(data.rows);
  });
};

const getOneProfessor_Schedule = (req, res) => {
  const id = req.params.id;
  const queryGetOneProfessorSchedule =
    "Select * from professor where professor_schedule_id = $1";

  db.query(queryGetOneProfessorSchedule, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.rowCount > 0) {
      return res.json(data.rows);
    } else {
      return res.json("Professor Schedule Not Found!");
    }
  });
};

const createProfessor_Schedule = (req, res) => {
  const getProfessorID = req.body.professor_id;
  const getSubjectId = req.body.subject_id;
  const getSemester = req.body.semester;
  const getBatch = req.body.batch;
  const getYear = req.body.year;


  if (isEmpty(getProfessorID)) {
    return res.json("Please Fill Professor Name");
  }
  if (isEmpty(getSubjectId)) {
    return res.json("Please Fill Subject Name");
  }
  if (isEmpty(getSemester)) {
    return res.json("Please Input Semester");
  }
  if (isEmpty(getBatch)) {
    return res.json("Please Input Batch");
  }
  if (isEmpty(getYear)) {
    return res.json("Please Input Year");
  }

  const queryCreateProfessor =
    "INSERT INTO professor_schedule (professor_id, subject_id, semester, batch,year) VALUES ($1,$2,$3,$4,$5)";

  db.query(
    queryCreateProfessor,
    [
        getProfessorID,
        getSubjectId,
        getSemester,
        getBatch,
        getYear
    ],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Professor Schedule Has Been Created!");
    }
  );
};

const deleteProfessor_Schedule = (req, res) => {
  const getIdProfessorSchedule = req.params.id;

  if (isEmpty(getIdProfessorSchedule)) {
    return res.json("Can't Get ID ProfessorSchedule");
  }

  db.query(
    "Delete from professor_schedule where professor_schedule_id =$1",
    [getIdProfessorSchedule],
    (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json("Professor Schedule Has Been Deleted!");
    }
  );
};

const editProfessor_Schedule = (req, res) => {
    const getProfessorScheduleID = req.body.professor_schedule_id;
    const getProfessorID = req.body.professor_id;
    const getSubjectId = req.body.subject_id;
    const getSemester = req.body.semester;
    const getBatch = req.body.batch;
    const getYear = req.body.year;
  
    if (isEmpty(getProfessorID)) {
        return res.json("Please Fill Professor Name");
      }
      if (isEmpty(getSubjectId)) {
        return res.json("Please Fill Subject Name");
      }
      if (isEmpty(getSemester)) {
        return res.json("Please Input Semester");
      }
      if (isEmpty(getBatch)) {
        return res.json("Please Input Batch");
      }
      if (isEmpty(getYear)) {
        return res.json("Please Input Year");
      }

  const queryEditUniversity =
    "update professor_schedule set professor_id=$1, subject_id=$2, semester=$3, batch=$4,year=$5 WHERE professor_schedule_id = $6";
  db.query(
    queryEditUniversity,
    [
        getProfessorID,
        getSubjectId,
        getSemester,
        getBatch,
        getYear,
        getProfessorScheduleID
    ],
    (err, data) => {
      
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Professor Has Been Edited!");
    }
  );
};
const editProfessor_Schedule_Day = (req, res) => {
    const getProfessorScheduleID = req.body.professor_schedule_id;
    const getProfessorScheduleDay = req.body.professor_schedule_day;
  
    if (isEmpty(getProfessorScheduleID)) {
        return res.json("Please Fill Professor Name");
      }

  const queryEditUniversity =
    "update professor_schedule set schedule=$1 WHERE professor_schedule_id = $2";
  db.query(
    queryEditUniversity,
    [
        getProfessorScheduleDay,
        getProfessorScheduleID
    ],
    (err, data) => {
        console.log(err)
        console.log(data)
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Schedule Has Been Edited!");
    }
  );
};
export {
  getAllProfessor_Schedule,
  getOneProfessor_Schedule,
  createProfessor_Schedule,
  editProfessor_Schedule,
  deleteProfessor_Schedule,
  editProfessor_Schedule_Day,
};
