const dashboard = (app) => {
    const {dashboard} = require("../controller/dashboard.controller")
    app.post("/api/dashboard",dashboard)
    // app.get("/api/dashboard/:id",getOne)
    // app.post("/api/dashboard",create)
    // app.delete("/api/dashboard",remove)
}
module.exports = dashboard;