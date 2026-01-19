import { getUser, updateUser } from "../controller/UserLogin.controller.js";

//const { validateToken } = require("../controller/auth.constroller");

const User = (app) => {
  app.get("/api/user/:id", getUser);
  app.put("/api/user/:id", updateUser);
};
export default User;
