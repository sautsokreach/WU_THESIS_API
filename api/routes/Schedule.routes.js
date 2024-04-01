import { createSchedule } from "../controller/Schedule.controller.js";

//const { validateToken } = require("../controller/auth.constroller");

const Schedule = (app) => {
  app.post("/api/schedule", createSchedule);
};
export default Schedule;
