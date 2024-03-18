import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllProfessor_Schedule = (req, res) => {
  db.query("SELECT * FROM professor_schedule", (err, data) => {
    res.json(data.rows);
  });
};

const getOneProfessor_Schedule = (req, res) => {
  const id = req.params.id;
  const queryGetOneProfessor =
    "Select * from professor where professor_id = $1";

  db.query(queryGetOneProfessor, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.rowCount > 0) {
      return res.json(data.rows);
    } else {
      return res.json("Professor Not Found!");
    }
  });
};

const createProfessor_Schedule = (req, res) => {
  const getFirstNameProfessor = req.body.first_name;
  const getLastNameProfessor = req.body.last_name;
  const getPhoneNumberProfessor = req.body.phone_number;
  const getDepartmentProfessor = 1;
  const email = req.body.email;
  const degree = req.body.degree;


  if (isEmpty(getFirstNameProfessor)) {
    return res.json("Please Fill Professor First Name");
  }
  if (isEmpty(getLastNameProfessor)) {
    return res.json("Please Fill Professor Last Name");
  }
  if (isEmpty(getDepartmentProfessor)) {
    return res.json("Please Input Professor Department");
  }
  if (isEmpty(getPhoneNumberProfessor)) {
    return res.json("Please Input Professor Phone Number");
  }

  const queryCreateProfessor =
    "INSERT INTO professor (first_name, last_name, department_id, phone_number,email,degree) VALUES ($1,$2,$3,$4,$5,$6)";

  db.query(
    queryCreateProfessor,
    [
      getFirstNameProfessor,
      getLastNameProfessor,
      getDepartmentProfessor,
      getPhoneNumberProfessor,
      email,
      degree
    ],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Professor Has Been Created!");
    }
  );
};

const deleteProfessor_Schedule = (req, res) => {
  const getIdProfessor = req.params.id;

  if (isEmpty(getIdProfessor)) {
    return res.json("Can't Get ID Professor");
  }

  db.query(
    "Delete from professor where professor_id =$1",
    [getIdProfessor],
    (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json("Professor Has Been Deleted!");
    }
  );
};

const editProfessor_Schedule = (req, res) => {
  const getIdProfessor = req.params.id;
  const getFirstNameProfessor = req.body.first_name;
  const getLastNameProfessor = req.body.last_name;
  const getPhoneNumberProfessor = req.body.phone_number;
  const getDepartmentProfessor = 1;
  const email = req.body.email;
  const degree = req.body.degree;
  getDepartmentProfessor
  if (isEmpty(getFirstNameProfessor)) {
    return res.json("Please Fill Professor First Name");
  }
  if (isEmpty(getLastNameProfessor)) {
    return res.json("Please Fill Professor Last Name");
  }
  if (isEmpty(getDepartmentProfessor)) {
    return res.json("Please Input Professor Department");
  }
  if (isEmpty(getPhoneNumberProfessor)) {
    return res.json("Please Input Professor Phone Number");
  }

  const queryEditUniversity =
    "update professor set first_name=$1, last_name=$2, department_id=$3, phone_number=$4,email=$5, degree=$6 WHERE professor_id = $7";
 
  db.query(
    queryEditUniversity,
    [
      getFirstNameProfessor,
      getLastNameProfessor,
      getDepartmentProfessor,
      getPhoneNumberProfessor,
      email,
      degree,
      getIdProfessor,
    ],
    (err, data) => {

      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Professor Has Been Edited!");
    }
  );
};
export {
  getAllProfessor_Schedule,
  getOneProfessor_Schedule,
  createProfessor_Schedule,
  editProfessor_Schedule,
  deleteProfessor_Schedule,
};
