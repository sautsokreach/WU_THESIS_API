import {
  getAllDepartment,
  createDepartment,
  editDepartment,
  getOneDepartment,
  deleteDepartment,
} from "../controller/Department.controller.js";

//const { validateToken } = require("../controller/auth.constroller");

const departments = (app) => {
  app.get("/api/departments", getAllDepartment);
  app.get("/api/department/:id", getOneDepartment);
  app.post("/api/createDepartment", createDepartment);
  app.put("/api/editDepartment/:id", editDepartment);
  app.delete("/api/deleteDepartment/:id", deleteDepartment);
};
export default departments;
