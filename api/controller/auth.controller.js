import db from "../config/db.config.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

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
  const comparePassword = bcrypt.compare(passwordUser, rows[0].password);
  if (!comparePassword) return res.status(400).json("Wrong Password!");

  // Create Cookie
  const token = Jwt.sign({ id: rows[0].id }, "jwtkey");
  const { password, ...other } = rows[0];

  // Send Cookie to Client
  res
    .cookie("access_token", token, {
      httpOnly: false,
    })
    .status(200)
    .json(other);
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

export { login, logout, register };
