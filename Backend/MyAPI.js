// nơi import thư viện
var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var mysql = require('mysql2');
var app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// connect
var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Chee180240",
    insecureAuth: true,
    database: "health_user_db"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!!!")
    var sql = "select * from record;";
    con.query(sql, function (err, results) {
        if (err) throw err;
        console.log(results);
    })
});
//viết api
app.get("/all", function (req, res) {
    var sql = "SELECT * FROM record;";
    con.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    });
})
app.post("/add", function (req, res) {
    const { id, alcohol_concentration, tempature, cordinate, speed_per_second, heading, record_time, userID } = req.body
    var sql = "insert into record(alcohol_concentration, tempature, cordinate, speed_per_second, heading, record_time, userID) values (" + alcohol_concentration + ", " + tempature + ", " + cordinate + ", '" + speed_per_second + "', " + heading + ", '" + record_time + "', " + userID + ");";
    con.query(sql, function (err, results) {
        if (err) throw err;
        res.send(" them thanh cong");
    });
})
app.post("/delete", function (req, res) {
    const { id } = req.body
    var sql = "delete from record where id = " + id + ";";
    con.query(sql, function (err, results) {
        if (err) throw err;
        res.send("xoa thanh cong");
    });
})

app.post("/update", function (req, res) {
    const { id, alcohol_concentration, tempature, cordinate, speed_per_second, heading, record_time, userID } = req.body
    var sql = "update record set alcohol_concentration = " + alcohol_concentration + ", tempature = " + tempature + ", cordinate = " + cordinate + ", speed_per_second = '" + speed_per_second + "', heading = " + heading + ", record_time = '" + record_time + "', userID = " + userID + " where id = " + id + ";";
    con.query(sql, function (err, results) {
        if (err) throw err;
        res.send("sua thanh cong");
    });
})

// server đang chạy ở cổng
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server is listening at http://%s:%s", host, port)
})