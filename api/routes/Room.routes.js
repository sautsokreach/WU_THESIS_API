import { getAllRoom } from "../controller/Room.controller.js";

//const { validateToken } = require("../controller/auth.constroller");

const rooms = (app) => {
  app.get("/api/room", getAllRoom);
  //   app.post("/api/user/assignRole", assignRole);
  //   app.post("/api/user", create);
  //   app.put("/api/user", update);
  //   app.delete("/api/user", remove);
};
export default rooms;
