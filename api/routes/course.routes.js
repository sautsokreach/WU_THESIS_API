const{
    getAll,
    getOne,
    create, 
    update,
    remove
} = require("../controller/course.controller");

const {validateToken} = require("../controller/auth.constroller")
const course = (app)=>{
    app.post("/api/course/getList",getAll)
    app.get("/api/course/:id",getOne)
    app.post("/api/course",create)
    app.put("/api/course",update)
    app.delete("/api/course",remove)

}
module.exports = course;