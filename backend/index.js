import express  from "express";
import mysql from "mysql";

const app = express();

// Create a connection to the database
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "Password",
database: "quizad"
})


db.connect((err) => {})
app.listen(8800, ()=>{
    console.log("Backend connected")
})

app.get("/", (req, res) => {
    res.json("Hello World");
});
