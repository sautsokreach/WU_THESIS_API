import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllDepartmentDegree = (req, res) => {
  db.query("SELECT * FROM department_degree", (err, data) => {
    res.json(data.rows);
  });
};

const getOneDepartmentDegree = (req, res) => {
  const id = req.params.id;
  const queryGetOneDepartmentDegree =
    "Select * from department_degree where department_degree_id = $1";

  db.query(queryGetOneDepartmentDegree, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.rowCount > 0) {
      return res.json(data.rows);
    } else {
      return res.json("Department Degree Not Found!");
    }
  });
};

const createDepartmentDegree = (req, res) => {
  const getDepartmentDegreeId = req.body.department_id;
  const getDegree = req.body.degree;
  const getName = req.body.name;

  if (isEmpty(getDepartmentDegreeId)) {
    return res.json("Please Fill Department Name");
  }

  const queryCreateDepartmentDegree =
    "INSERT INTO department_degree (department_id,name, degree) VALUES ($1,$2,$3)";

  db.query(
    queryCreateDepartmentDegree,
    [getDepartmentDegreeId, getName, getDegree],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Department and Degree Has Been Created!");
    }
  );
};

const editDepartmentDegree = (req, res) => {
  const getIdDepartmentDegree = req.params.id;
  const getDepartmentId = req.body.department_id;
  const getDegree = req.body.degree;
  const getName = req.body.name;

  if (isEmpty(getName)) {
    return res.json("Please Fill Degree Name");
  }

  const queryEditDepartmentDegree =
    "update department_degree set department_id = $1 ,name = $2 ,degree = $3 WHERE department_degree_id = $4";

  db.query(
    queryEditDepartmentDegree,
    [getDepartmentId, getName, getDegree, getIdDepartmentDegree],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Department and Degree Has Been Edited!");
    }
  );
};

const deleteDepartmentDegree = (req, res) => {
  const getIdDepartmentDegree = req.params.id;

  db.query(
    "Delete from department_degree where department_degree_id = $1",
    [getIdDepartmentDegree],
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
