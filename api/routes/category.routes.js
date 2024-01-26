
const {
    getAll,
    create,
    update,
    remove
} = require("../controller/category.controller")
const {validateToken} = require("../controller/auth.constroller");
const multer = require("multer");


// const image_path = "/Applications/XAMPP/xamppfiles/htdocs/Project/Image/101/"
const image_path = "/Applications/XAMPP/xamppfiles/htdocs/project/Image/101/"
// const image_path = "http://192.168.100.214:80/Project/Image/101/"

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, image_path);
    },
    filename: function (req, file, callback) {
        // callback(null, file.originalname);
        
        // check file extension
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
            // upload only png and jpg format
            return callback(new Error('Please upload a Image'))
        }
        callback(null, file.originalname)
    }
});

const upload = multer({
    storage : storage,
    limits : {
        fieldSize : 1024*1024*3
    }
}) 

const categroy = (app) => {
    app.get("/api/category",getAll)
    app.get("/api/category/:id",getAll)
    app.post("/api/category",upload.single("image"),create)
    app.put("/api/category",upload.single("image"),update)
    app.delete("/api/category",remove)
} 
module.exports = categroy;