import {
  getAllSubject,
  getOneSubject,
  createSubject,
  editSubject,
  deleteSubject,
} from "../controller/Subject.controller.js";

//const { validateToken } = require("../controller/auth.constroller");

const subject = (app) => {
  app.get("/api/subjects", getAllSubject);
  app.get("/api/subject/:id", getOneSubject);
  app.post("/api/createSubject", createSubject);
  app.put("/api/editSubject/:id", editSubject);
  app.delete("/api/deleteSubject/:id", deleteSubject);
};
export default subject;
