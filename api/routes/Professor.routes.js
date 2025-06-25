import {
  getAllProfessor,
  getApproverPreparer,
  getAvailableProfessor,
  getOneProfessor,
  createProfessor,
  editProfessor,
  deleteProfessor,
} from "../controller/Professor.controller.js";
import { validateToken } from "../controller/auth.controller.js";

const professor = (app) => {
  app.get("/api/professors", getAllProfessor);
  app.get("/api/getApproverPreparer", getApproverPreparer);
  app.get("/api/professor/:id", getOneProfessor);
  app.post("/api/getAvailableProfessor", getAvailableProfessor);
  app.post("/api/createProfessor", createProfessor);
  app.put("/api/editProfessor/:id", editProfessor);
  app.delete("/api/deleteProfessor/:id", deleteProfessor);
};
export default professor;
