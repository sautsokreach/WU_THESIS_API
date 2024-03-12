import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Import Files from Route
import rooms from "./api/routes/Room.routes.js";

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

// Server Port

const port = 8080;
app.listen(port, () => {
  console.log("Server run on port : localhost:" + port);
});
