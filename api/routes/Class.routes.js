import { getAllCLass, getOneClass } from "../controller/Class.controller.js";

//const { validateToken } = require("../controller/auth.constroller");

const classes = (app) => {
  app.get("/api/classes", getAllCLass);
  app.get("/api/class/:id", getOneClass);
};
export default classes;
