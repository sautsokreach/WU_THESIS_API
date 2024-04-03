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
    app.post("/api/createSchedulesDay", createScheduleDay);
    app.put("/api/editSchedulesDay/:id", editScheduleDay);
    app.delete("/api/deleteSchedulesDay/:id", deleteScheduleDay);
  };
  export default schedulesDay;
  