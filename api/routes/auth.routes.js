import {
  login,
  logout,
  register,
  editUser,
} from "../controller/auth.controller.js";

//const { validateToken } = require("../controller/auth.constroller");

const Auth = (app) => {
  app.post("/api/register", register);
  app.post("/api/login", login);
  app.post("/api/logout", logout);
  app.put("/api/editUser/:id", editUser);
};

export default Auth;
