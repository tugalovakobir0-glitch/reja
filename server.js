const express = require("express");
const app = express();
const res = require("express/lib/response");
const http = require("http");
const fs = require("fs");

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

app.post("/create-item", (req, res) => {
  console.log(req.body);
  res.json({ test: `assalomu alaykum hurmatli ` });
});
app.get("/develop", (req, res) => {
  res.render("develop", { user: user });
});
app.get("/", function (rep, res) {
  res.render("harid");
});

const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function () {
  console.log(`hammasi meni nazoratim ostida: ${PORT}`);
});
