const express = require("express")
const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt");
const bodyParser = require("body-parser")
const cors = require("cors");

var corsOptions = {
  origin: "*"
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))





// const passEncrypt = bcrypt.hashSync("123",8);
// if(bcrypt.compareSync("123",passEncrypt)){
//     console.log("correct")
// }


const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("Server run on port : localhost:"+port)
})

