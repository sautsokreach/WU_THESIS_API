import {
    getAllProfessor_Schedule,
    getOneProfessor_Schedule,
    createProfessor_Schedule,
    editProfessor_Schedule,
    deleteProfesso_Scheduler,
  } from "../controller/Professor_Schedule.controller";
  
  //const { validateToken } = require("../controller/auth.constroller");
  
  const professor = (app) => {
    app.get("/api/professorSchedule", getAllProfessor_Schedule);
    app.get("/api/professorSchedule/:id", getOneProfessor_Schedule);
    app.post("/api/professorSchedule", createProfessor_Schedule);
    app.put("/api/professorSchedule/:id", editProfessor_Schedule);
    app.delete("/api/professorSchedule/:id", deleteProfessor_Schedule);
  };