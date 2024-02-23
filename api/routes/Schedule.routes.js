const{
    getAll,
    create, 
    update,
    remove,
    assignRole
} = require("../controller/Schedule.controller");

const {validateToken} = require("../controller/auth.constroller")
const schedule = (app)=>{
    app.get("/api/schedule",validateToken,getAll)
    app.post("/api/schedule",validateToken,assignRole)
   // app.post("/api/user",validateToken,create)
   // app.put("/api/user",validateToken,update)
   // app.delete("/api/user",validateToken,remove)
}
module.exports = schedule;