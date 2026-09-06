const express = require("express");
//bu kod expressni require qib chaqirib olishda ishlatiladi
const app = express();
//bunda expressni app degan metodini chaqiryapmiz
const res = require("express/lib/response");

const fs = require("fs");
//bu yerda fail sestimni require qilyapmiz
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
  //qadam 2:malumotlar fronteddan bacentga kirdi
  //qadam 3:malumotlar bacenddan databacega kirdi
  db.collection("plans").insertOne(
    { reja: new_reja },
    //qadam 4:malumotlar databacedann bacentga qaytdi
    //qadam 5:malumotlar bacentdan frontedga qaytdi

    (err, data) => {
      console.log(data.ops);
      res.json(data.ops[0]);
    },
  );
});
app.post("/delete.items", (req, res) => {
  const id = req.body._id;
  //qadam 2:malumotlar fronteddan bacentga kirdi
  //qadam 3:malumotlar  bacentdan databacega ketdi

  db.collection("plans").deleteOne(
    { _id: new Mongodb.ObjectId(id) },
    //qadam 4:malumotlar databacedan bacentga kirdi
    //qadam 5:malumotlar bacentdan frontega kirdi
    function (err, data) {
      res.json({
        state: "Muvaffaqiyatli o'chirildi",
      });
    },
  );
});
app.post("/edit-item", (req, res) => {
  const data = req.body;
  //qadam 2:malumotlar fronteddan bacentga kirdi
  //qadam 3:malumotlar  bacentdan databace kirdi
  console.log(data);
  db.collection("plans").findOneAndUpdate(
    {
      _id: new Mongodb.ObjectId(data.id),
    },
    { $set: { reja: data.new_Input } },
    //qadam 4:malumotlar  databacedan bacentga  kirdi
    //qadam 5:malumotlar bacentdan frontentga  kirdi
    function (err, data) {
      res.json({ state: "success" });
    },
  );
});
app.post("/delete-all", (req, res) => {
  //qadam 2:malumotlar fronteddann bacentga kirdi
  //qadam 3:malumotlar  bacenddan databacega kirdi
  if (req.body.delete_all) {
    db.collection("plans").deleteMany(function () {
      //qadam 4:malumotlar databacedann bacentga qaytdi
      res.json({ state: "Hamma reja O'chirildi!" });
    });
  }
});
app.get("/develop", (req, res) => {
  res.render("develop", { user: user }, function (err, data) {
    res.json({ state: "mufaqqiyatli ucirildi!" });
  });
});

app.get("/", (rep, res) => {
  console.log("user entered /");
  //qadam 2:malumotlar fronteddan bacentga kirdi
  //qadam 3:malumotlar bacentdan databacega kirdi
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      //qadam 4:malumotlar databacedann bacentga qaytdi
      //qadam 5:malumotlar  bacentdan qaytdi
      if (err) {
        res.end("nimadir hato ketdi");
      } else {
        res.render("reja", { items: data });
      }
    });
});
module.exports = app;
