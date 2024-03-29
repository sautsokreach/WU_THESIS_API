import { login, logout, register } from "../controller/auth.controller.js";

//const { validateToken } = require("../controller/auth.constroller");

const Auth = (app) => {
  app.post("/api/register", register);
  app.post("/api/login", login);
  app.post("/api/logout", logout);
};

export default Auth;
