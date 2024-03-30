import {
  getAllProfessor,
  getAvailableProfessor,
  getOneProfessor,
  createProfessor,
  editProfessor,
  deleteProfessor,
} from "../controller/Professor.controller.js";

//const { validateToken } = require("../controller/auth.constroller");

const professor = (app) => {
  app.get("/api/professors", getAllProfessor);
  app.get("/api/professor/:id", getOneProfessor);
  app.post("/api/getAvailableProfessor", getAvailableProfessor);
  app.post("/api/createProfessor", createProfessor);
  app.put("/api/editProfessor/:id", editProfessor);
  app.delete("/api/deleteProfessor/:id", deleteProfessor);
};
export default professor;
