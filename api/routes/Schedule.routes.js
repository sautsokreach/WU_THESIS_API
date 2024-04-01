import {
    getAllSchedules,
    //getOneSchedule,
    createSchedule,
    editSchedule,
    deleteSchedule,
  } from "../controller/Schedule.controller.js";
  
  //const { validateToken } = require("../controller/auth.constroller");
  
  const schedule = (app) => {
    app.get("/api/schedules", getAllSchedules);
    //app.get("/api/Schedule/:id", getOneSubject);
    app.post("/api/createSchedule", createSchedule);
    app.put("/api/editSchedule/:id", editSchedule);
    app.delete("/api/deleteSchedule/:id", deleteSchedule);
  };
  export default schedule;
  