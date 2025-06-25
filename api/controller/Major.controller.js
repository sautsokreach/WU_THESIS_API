import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllDepartmentDegree = (req, res) => {
  db.query(
    "select m.major_id, d.department_id, d.department_name, major_name,degree from major as m inner join department as d on m.department_id = d.department_id",
    (err, data) => {
      res.json(data?.rows);
    }
  );
};

const getOneDepartmentDegree = (req, res) => {
  const id = req.params.id;
  const queryGetOneDepartmentDegree =
    "Select * from major where major_id = $1";

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
  const getDepartmentId = req.body.department_id;
  const getDegree = req.body.degree;
  const getMajor = req.body.major_name;

  if (isEmpty(getDepartmentId)) {
    return res.json("Please Fill Department Name");
  }

  const queryCreateDepartmentDegree =
    "INSERT INTO major (department_id,major_name, degree) VALUES ($1,$2,$3)";

  db.query(
    queryCreateDepartmentDegree,
    [getDepartmentId, getMajor, getDegree],
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
  const getMajor = req.body.major_name;

  console.log(getIdDepartmentDegree);

  if (isEmpty(getMajor)) {
    return res.json("Please Fill Degree Name");
  }

  const queryEditDepartmentDegree =
    "update major set department_id = $1 ,major_name = $2 ,degree = $3 WHERE major_id = $4";

  db.query(
    queryEditDepartmentDegree,
    [getDepartmentId, getMajor, getDegree, getIdDepartmentDegree],
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
    "Delete from major where major_id = $1",
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
