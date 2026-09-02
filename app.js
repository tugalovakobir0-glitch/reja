const express = require("express");
const app = express();
const res = require("express/lib/response");

const fs = require("fs");
const db = require("./server").db();

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
  if (err) {
    console.log("ERROR", err);
  } else {
    user = JSON.parse(data);
  }
});

// 1
app.use(express.static(`public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3
app.set("views", "views");
app.set("view engine", "ejs");
//4
const Mongodb = require("mongodb");
app.post("/create-item", (req, res) => {
  console.log("user entered /create-item");
  const new_reja = req.body.reja;
  db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    console.log(data.ops);
    res.json(data.ops[0]);
  });
});
app.post("/delete.items", (req, res) => {
  const id = req.body.id;
  db.collection(
    "plans",
    { _id: new Mongodb.ObjectId(id) },
    function (err, data) {
      res.json({ state: "Muffaqiyatli qabul qilindi" });
    },
  );
});

app.get("/develop", (req, res) => {
  res.render("develop", { user: user }, function (err, data) {
    res.json({ state: "mufaqqiyatli ucirildi!" });
  });
});
app.get("/", function (rep, res) {
  console.log("user entered /");
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        res.end("nimadir hato ketdi");
      } else {
        res.render("reja", { items: data });
      }
    });
});
module.exports = app;
