import {
  getAllRoom,
  createRoom,
  updateRoom,
} from "../controller/Room.controller.js";

//const { validateToken } = require("../controller/auth.constroller");

const rooms = (app) => {
  app.get("/api/rooms", getAllRoom);
  app.post("/api/createRoom", createRoom);
  app.put("/api/updateRoom", updateRoom);
  //   app.delete("/api/user", remove);
};
export default rooms;
