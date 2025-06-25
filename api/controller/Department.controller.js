import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllDepartment = (req, res) => {
  db.query("SELECT * FROM department", (err, data) => {
    res.json(data.rows);
  });
};

const getOneDepartment = (req, res) => {
  const id = req.params.id;
  const queryGetOneDepartment =
    "Select * from department where department_id = $1";

  db.query(queryGetOneDepartment, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.rowCount > 0) {
      return res.json(data.rows);
    } else {
      return res.json("Department Not Found!");
    }
  });
};

const createDepartment = (req, res) => {
  const getDepartmentName = req.body.department_name;

  if (isEmpty(getDepartmentName)) {
    return res.json("Please Fill Department Name");
  }

  const queryCreateDepartment =
    "INSERT INTO department (department_name) VALUES ($1)";

  db.query(queryCreateDepartment, [getDepartmentName], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.status(200).json("Department Has Been Created!");
  });
};

const editDepartment = (req, res) => {
  const getIdDepartment = req.params.id;
  const getDepartmentName = req.body.department_name;

  if (isEmpty(getDepartmentName)) {
    return res.json("Please Fill Department Name");
  }

  const queryEditDepartment =
    "update department set  department_name = $1 WHERE department_id = $2";

  db.query(
    queryEditDepartment,
    [getDepartmentName, getIdDepartment],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Department Has Been Edited!");
    }
  );
};

const deleteDepartment = (req, res) => {
  const getIdDepartment = req.params.id;

  db.query(
    "Delete from department where department_id = $1",
    [getIdDepartment],
    (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Department Has Been Deleted!");
    }
  );
};

export {
  getAllDepartment,
  createDepartment,
  editDepartment,
  getOneDepartment,
  deleteDepartment,
};
