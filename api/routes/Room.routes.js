import {
  getAllRoom,
  createRoom,
  editRoom,
  getOneRoom,
  deleteRoom
} from "../controller/Room.controller.js";

//const { validateToken } = require("../controller/auth.constroller");

const rooms = (app) => {
  app.get("/api/rooms", getAllRoom);
  app.get("/api/room/:roomNumber", getOneRoom);
  app.post("/api/createRoom", createRoom);
  app.put("/api/editRoom/:id", editRoom);
  app.delete("/api/deleteRoom/:id", deleteRoom);
};
export default rooms;
