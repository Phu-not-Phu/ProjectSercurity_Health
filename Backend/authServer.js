const express = require("express");
const app = express();
require("dotenv").config();

const port = 8000;

const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

//JWT
const whitelist = ["http://localhost:3000", "http://localhost:8000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Database connection
const password = "danghomp69";
const database = "health_user_db";
const table_name = "user";

var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: password,
  insecureAuth: true,
  database: database,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!!!");
  // var sql = "select * from " + table_name;
  // con.query(sql, function (err, results) {
  //   if (err) throw err;
  //   console.log(results);
  // });
});

//WebAPI
let refreshTokens = [];

app.post("/users/token", async (req, res) => {
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = generateAccessToken({ email: user.email });
    res.json({email: user.user_email, accessToken: accessToken });
  });
});

app.get("/users", (req, res) => {
  var sql = "SELECT * FROM user LIMIT 5";
  con.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/users/auths", authenticateToken, (req, res) => {
  var sql = "SELECT * FROM user";
  con.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/users/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.encrypted_password, 10);
    var sql = "INSERT INTO user (user_email, encrypted_password) VALUES ?";
    var values = [[req.body.user_email, hashedPassword]];

    con.query(sql, [values], function (err, results) {
      if (err) throw err;
      res.send("User Created!!!");
    });
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  var sql = "SELECT * FROM user WHERE user_email = ?";
  con.query(sql, [req.body.user_email], async function (err, results) {
    if (err) throw err;
    if (results.length == 0) {
      return res.status(400).send("Cannot find user");
    }
    try {
      if (
        await bcrypt.compare(
          req.body.encrypted_password,
          results[0].encrypted_password
        )
      ) {
        let user = {
          user_email: results[0].user_email,
          encrypted_password: results[0].encrypted_password,
        };

        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN, {
          expiresIn: "1h",
        });

        refreshTokens.push(refreshToken);
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
        res.send("Logged In");
      } else {
        res.send("Not Allowed");
      }
    } catch {
      res.status(500).send();
    }
  });
});

app.delete("/users/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "120s",
  });
}

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
