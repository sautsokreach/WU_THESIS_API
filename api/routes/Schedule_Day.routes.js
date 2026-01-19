import {
    getAllScheduleDays,
    //getOneSchedule,
    createScheduleDay,
    editScheduleDay,
    deleteScheduleDay,
  } from "../controller/Schedule_Day.controller.js";
  
  //const { validateToken } = require("../controller/auth.constroller");
  
  const schedulesDay = (app) => {
    app.get("/api/ScheduleDays/:id", getAllScheduleDays);
    //app.get("/api/Schedule/:id", getOneSubject);
    app.post("/api/createScheduleDay", createScheduleDay);
    app.put("/api/editScheduleDay/:id", editScheduleDay);
    app.delete("/api/deleteScheduleDay/:id", deleteScheduleDay);
  };
  export default schedulesDay;
  