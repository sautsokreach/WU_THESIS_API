import db from "../config/db.config.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { isEmpty,config } from "../config/hepler.js";

const validateToken = (req,res,next) => {
    var AuthHeader = req.headers["authorization"]
    if(AuthHeader){
        AuthHeader = AuthHeader.split(" ");
        var token = AuthHeader[1]
        console.log(token)
        Jwt.verify(token,config.local_token,(err,obj_info)=>{
            if(!err){
                req.user = obj_info.user
                next();
            }else{
                res.json({
                    error:true,
                    message : "Invalid token"
                })
            }
        })
    }else{
        res.json({
            error:true,
            message : "Please fill in token"
        })
    }
}

const register = async (req, res) => {
  const userName = req.body.name;
  const passwordUser = req.body.password;
  const userGmail = req.body.emailId;

  try {
    // Check if user exists
    const querySelectAll =
      "SELECT * FROM user_login WHERE email=$1 OR username=$2";
    const { rows } = await db.query(querySelectAll, [userGmail, userName]);

    if (rows.length) {
      return res.status(409).json("User already exists!");
    }

    // Hash the password
    const saltRounds = 10;
    const hash = await bcrypt.hash(passwordUser, saltRounds);

    // Insert user into the database
    const queryInsert =
      "INSERT INTO user_login (username, password, email) VALUES ($1, $2, $3)";
    await db.query(queryInsert, [userName, hash, userGmail]);

    // Respond with success message
    return res.status(200).json("User created!");
  } catch (err) {
    // Handle errors
    console.error("Error:", err);
    return res.status(500).json("Internal Server Error");
  }
};

const login = async (req, res) => {
  const userName = req.body.username;
  const passwordUser = req.body.password;

  //console.log(userName, passwordUser);

  // Verify User
  const querySelectAll = "SELECT * FROM user_login WHERE username=$1";
  const { rows } = await db.query(querySelectAll, [userName]);
  if (rows.length === 0) return res.status(404).json("User Not Found!");

  // Verify Password User
  const comparePassword = await bcrypt.compare(passwordUser, rows[0].password);
  if (!comparePassword) return res.status(400).json("Wrong Password!");
 

  // Create Cookie
  const token = Jwt.sign({ id: rows[0].id }, config.local_token);
  const { password, reg_date, ...other } = rows[0];
  other.token = token;

  // Send Cookie to Client
  //console.log(token);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.cookie("access_token", token).status(200).json(other);
};

const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};

const editUser = (req, res) => {
  const userId = req.params.id;
  const userName = req.body.username;
  const email = req.body.email;
  const title = req.body.title;
  const place = req.body.place;
  const about = req.body.about;

  // console.log(userId, userName, email, title, place, about);

  if (isEmpty(userName)) return res.json("Please Input Name");
  const queryUser =
    "update user_login set username =$1, email=$2, title =$3, place =$4, about=$5  where user_id = $6";
  db.query(
    queryUser,
    [userName, email, title, place, about, userId],
    (err, data) => {
      if (err){
        console.log(err)
          return res.status(400).json(err);
      } 
      return res.status(200).json("Updated User!");
    }
  );
};

export { login, logout, register, editUser ,validateToken};
