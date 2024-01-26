const{
    getAll,
    create, 
    update,
    remove,
    assignRolePermission
} = require("../controller/role.controller");

const {validateToken} = require("../controller/auth.constroller")
const course = (app)=>{
    app.get("/api/role",validateToken,getAll)
    app.post("/api/role",validateToken,create)
    app.put("/api/role",validateToken,update)
    app.delete("/api/role",validateToken,remove)
    app.post("/api/role/assignRolePermission",validateToken,assignRolePermission)
}
module.exports = course;