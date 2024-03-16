import {
  getAllUniversity,
  getOneUniversity,
  createUniversity,
  editUniversity,
  deleteUniversity,
} from "../controller/University.controller.js";

//const { validateToken } = require("../controller/auth.constroller");

const university = (app) => {
  app.get("/api/universities", getAllUniversity);
  app.get("/api/university/:id", getOneUniversity);
  app.post("/api/createUniversity", createUniversity);
  app.put("/api/editUniversity/:id", editUniversity);
  app.delete("/api/deleteUniversity/:id", deleteUniversity);
};
export default university;
