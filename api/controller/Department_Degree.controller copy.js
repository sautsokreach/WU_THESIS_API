import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllDepartmentDegree = (req, res) => {
  db.query("SELECT * FROM department_degree", (err, data) => {
    res.json(data.rows);
  });
};

const getOneDepartmentDegree  = (req, res) => {
  const id = req.params.id;
  const queryGetOneDepartmentDegree =
    "Select * from department where department_degree_id = $1";

  db.query(queryGetOneDepartmentDegree, [id], (err, data) => {
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

const createDepartmentDegree  = (req, res) => {
  const getDepartmentId = req.body.department_id;
  const getDegree = req.body.degree;
  const getName = req.body.name;

  if (isEmpty(getDepartmentId)) {
    return res.json("Please Fill Department Name");
  }

  const queryCreateDepartment =
    "INSERT INTO department_degree (department_id,degree,name) VALUES ($1,$2,$3)";

  db.query(queryCreateDepartment, [getDepartmentId,getDegree,getName], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.status(200).json("Department and Degree Has Been Created!");
  });
};

const editDepartmentDegree  = (req, res) => {
  const getIdDepartmentDegree = req.params.id;
  const getDepartmentId = req.body.department_id;
  const getDegree = req.body.degree;
  const getName = req.body.name;

  if (isEmpty(getDepartmentName)) {
    return res.json("Please Fill Department Name");
  }

  const queryEditDepartment =
    "update department set  department_id = $1 ,degree = $2 ,name = $3 WHERE department_id = $4";

  db.query(
    queryEditDepartment,
    [getDepartmentId,getDegree,getName, getIdDepartmentDegree],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Department  and Degree Has Been Edited!");
    }
  );
};

const deleteDepartmentDegree  = (req, res) => {
  const getIdDepartment = req.params.id;

  db.query(
    "Delete from department where department_degree_id = $1",
    [getIdDepartment],
    (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Department and Degree Has Been Deleted!");
    }
  );
};

export {
  getAllDepartmentDegree,
  createDepartmentDegree,
  editDepartmentDegree,
  getOneDepartmentDegree,
  deleteDepartmentDegree,
};
