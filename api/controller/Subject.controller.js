import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllSubject = (req, res) => {
  db.query("SELECT * FROM subject", (err, data) => {
    res.json(data.rows);
  });
};

const getOneSubject = (req, res) => {
  const id = req.params.id;
  const queryGetOneSubject = "Select * from subject where subject_id = $1";

  db.query(queryGetOneSubject, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data.rows);
  });
};

const createSubject = (req, res) => {
  const getSubjectName = req.body.SubjectName;
  const getSubjectCode = req.body.SubjectCode;
  const getDepartmentId = req.body.DepartmentId;

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

const editSubject = (req, res) => {
  const getIdSubject = req.params.id;
  const getSubjectName = req.body.SubjectName;
  const getSubjectCode = req.body.SubjectCode;
  const getDepartmentId = req.body.DepartmentId;

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

const deleteSubject = (req, res) => {
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
  getAllSubject,
  getOneSubject,
  createSubject,
  editSubject,
  deleteSubject,
};
