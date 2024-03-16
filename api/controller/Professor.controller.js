import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllProfessor = (req, res) => {
  db.query("SELECT * FROM professor", (err, data) => {
    res.json(data.rows);
  });
};

const getOneProfessor = (req, res) => {
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

const createProfessor = (req, res) => {
  const getFirstNameProfessor = req.body.FirstName;
  const getLastNameProfessor = req.body.LastName;
  const getPhoneNumberProfessor = req.body.PhoneNumber;
  const getDepartmentProfessor = req.body.DepartmentProfessor;

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
    "INSERT INTO professor (first_name, last_name, department_id, phone_number) VALUES ($1,$2,$3,$4)";

  db.query(
    queryCreateProfessor,
    [
      getFirstNameProfessor,
      getLastNameProfessor,
      getDepartmentProfessor,
      getPhoneNumberProfessor,
    ],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Professor Has Been Created!");
    }
  );
};

const deleteProfessor = (req, res) => {
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

const editProfessor = (req, res) => {
  const getIdProfessor = req.params.id;
  const getFirstNameProfessor = req.body.FirstName;
  const getLastNameProfessor = req.body.LastName;
  const getPhoneNumberProfessor = req.body.PhoneNumber;
  const getDepartmentProfessor = req.body.DepartmentProfessor;

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
    "update professor set first_name=$1, last_name=$2, department_id=$3, phone_number=$4 WHERE professor_id = $5";

  db.query(
    queryEditUniversity,
    [
      getFirstNameProfessor,
      getLastNameProfessor,
      getDepartmentProfessor,
      getPhoneNumberProfessor,
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
  getAllProfessor,
  getOneProfessor,
  createProfessor,
  editProfessor,
  deleteProfessor,
};
