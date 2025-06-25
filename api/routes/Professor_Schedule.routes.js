import {
    getAllProfessor_Schedule,
    getOneProfessor_Schedule,
    createProfessor_Schedule,
    editProfessor_Schedule,
    deleteProfessor_Schedule,
    editProfessor_Schedule_Day
  } from "../controller/Professor_Schedule.controller.js";
  
  //const { validateToken } = require("../controller/auth.constroller");
  
  const professor_schedule = (app) => {
    app.get("/api/professorSchedule", getAllProfessor_Schedule);
    app.get("/api/professorSchedule/:id", getOneProfessor_Schedule);
    app.post("/api/professorSchedule", createProfessor_Schedule);
    app.put("/api/professorSchedule/:id", editProfessor_Schedule);
    app.delete("/api/professorSchedule/:id", deleteProfessor_Schedule);
    app.put("/api/professorScheduleDay/:id", editProfessor_Schedule_Day);
    
  };

  export default professor_schedule;