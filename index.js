import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Import Files from Route
import rooms from "./api/routes/Room.routes.js";
import departments from "./api/routes/Department.routes.js";
import university from "./api/routes/University.routes.js";
import professor from "./api/routes/Professor.routes.js";
import subject from "./api/routes/Subject.routes.js";
import professor_schedule from "./api/routes/Professor_Schedule.routes.js";
import Major from "./api/routes/Major.routes.js";
import Auth from "./api/routes/auth.routes.js";
import User from "./api/routes/UserLogin.routes.js";
import Schedule from "./api/routes/Schedule.routes.js";
import ScheduleDay from "./api/routes/Schedule_Day.routes.js";

var corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "https://wu-thesis-ten.vercel.app"]
};

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Use Routes
rooms(app);
departments(app);
university(app);
professor(app);
subject(app);
professor_schedule(app);
Major(app);
Auth(app);
User(app);
Schedule(app);
ScheduleDay(app);
// Server Port

const port = 8080;
app.listen(port, () => {
  console.log("Server run on port : localhost:" + port);
});
