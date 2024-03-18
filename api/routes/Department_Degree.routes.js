import {
  getAllDepartmentDegree,
  createDepartmentDegree,
  editDepartmentDegree,
  getOneDepartmentDegree,
  deleteDepartmentDegree,
} from "../controller/Department_Degree.controller copy.js";

//const { validateToken } = require("../controller/auth.constroller");

const departmentDegree = (app) => {
  app.get("/api/departmentsDegree", getAllDepartmentDegree);
  app.get("/api/departmentDegree/:id", getOneDepartmentDegree);
  app.post("/api/createDepartmentDegree", createDepartmentDegree);
  app.put("/api/editDepartmentDegree/:id", editDepartmentDegree);
  app.delete("/api/deleteDepartmentDegree/:id", deleteDepartmentDegree);
};
export default departmentDegree;
