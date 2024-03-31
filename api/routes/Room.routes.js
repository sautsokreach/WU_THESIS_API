import {
  getAllRoom,
  createRoom,
  editRoom,
  getOneRoom,
  deleteRoom,
  getAvailableRoom,
  getAvailableRooms,
} from "../controller/Room.controller.js";

//const { validateToken } = require("../controller/auth.constroller");

const rooms = (app) => {
  app.get("/api/rooms", getAllRoom);
  app.get("/api/room/:roomNumber", getOneRoom);
  app.post("/api/createRoom", createRoom);
  app.post("/api/getAvailableRoom", getAvailableRoom);
  app.get("/api/getAvailableRoom", getAvailableRooms);
  app.put("/api/editRoom/:id", editRoom);
  app.delete("/api/deleteRoom/:id", deleteRoom);
};
export default rooms;
