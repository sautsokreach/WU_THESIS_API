
const student = (app) => {
    const {
        getAll,
        create,
        edit,
        remove
    } = require("../controller/studentclassroom.controller")
    const {validateToken} = require("../controller/auth.constroller")

    app.post("/api/studentRegister/getAll",validateToken,getAll)
    app.post("/api/studentRegister/create",validateToken,create)
    app.post("/api/studentRegister/create",validateToken,edit)
    app.post("/api/studentRegister/remove",validateToken,remove)

}

module.exports = student;