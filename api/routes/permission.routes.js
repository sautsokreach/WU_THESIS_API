const{
    getAll,
    create, 
    update,
    remove
} = require("../controller/permission.controller");

const {validateToken} = require("../controller/auth.constroller")
const course = (app)=>{
    app.get("/api/permission",validateToken,getAll)
    app.post("/api/permission",validateToken,update)
    app.put("/api/permission",validateToken,update)
    app.delete("/api/permission",validateToken,remove)
}
module.exports = course;