
const student = (app) => {
    const router = require("express").Router();
    const student_controller = require("../controller/student.contoller")
    const {validateToken} = require("../controller/auth.constroller")
    router.get("/api/student",student_controller.getList)
    router.get("/api/student/:id",student_controller.getOne)
    router.post("/api/student",student_controller.create)
    router.put("/api/student",student_controller.edit)
    router.delete("/api/student",student_controller.remove)

    app.use(router);

}

module.exports = student;