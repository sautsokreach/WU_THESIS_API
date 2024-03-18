import {
  getAllDepartmentDegree,
  createDepartmentDegree,
  editDepartmentDegree,
  getOneDepartmentDegree,
  deleteDepartmentDegree,
} from "../controller/Department.controller.js";

//const { validateToken } = require("../controller/auth.constroller");

const departments = (app) => {
  app.get("/api/departmentsDegree", getAllDepartmentDegree);
  app.get("/api/departmentsDegree/:id", getOneDepartmentDegree);
  app.post("/api/departmentsDegree", createDepartmentDegree);
  app.put("/api/departmentsDegree/:id", editDepartmentDegree);
  app.delete("/api/deleteDepartment/:id", deleteDepartmentDegree);
};
export default departments;
