import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Import Files from Route
import rooms from "./api/routes/Room.routes.js";
import departments from "./api/routes/Department.routes.js";
import university from "./api/routes/University.routes.js";
import professor from "./api/routes/Professor.routes.js";
import subject from "./api/routes/Subject.routes.js";
import classes from "./api/routes/Class.routes.js";
import departmentDegree from "./api/routes/Department_Degree.routes.js";

var corsOptions = {
  origin: "*",
};
const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Use Routes
rooms(app);
classes(app);
departments(app);
university(app);
professor(app);
subject(app);
departmentDegree(app);

// Server Port

const port = 8080;
app.listen(port, () => {
  console.log("Server run on port : localhost:" + port);
});
