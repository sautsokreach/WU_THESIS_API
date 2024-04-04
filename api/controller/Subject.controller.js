import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllSubject = (req, res) => {
  db.query("SELECT * FROM subject order by subject_id asc", (err, data) => {
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
  const getSubjectName = req.body.subject_name;
  const getSubjectCode = req.body.subject_code;

  if (isEmpty(getSubjectName)) {
    return res.json("Please Fill Subject Name");
  }
  if (isEmpty(getSubjectCode)) {
    return res.json("Please Fill Subject Code");
  }


  const queryCreateRoom =
    "INSERT INTO subject ( subject_name, subject_code) VALUES ($1,$2)";

  db.query(
    queryCreateRoom,
    [getSubjectName, getSubjectCode],
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
  const getSubjectName = req.body.subject_name;
  const getSubjectCode = req.body.subject_code;

  if (isEmpty(getSubjectName)) {
    return res.json("Please Fill Subject Name");
  }
  if (isEmpty(getSubjectCode)) {
    return res.json("Please Fill Subject Code");
  }

  const queryEditSubject =
    "update subject set subject_name=$1, subject_code=$2 WHERE subject_id = $3";

  db.query(
    queryEditSubject,
    [getSubjectName, getSubjectCode, getIdSubject],
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
