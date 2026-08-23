const express = require("express");
const app = express();
const http = require("http");
// 1
app.use(express.static(`public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 3
app.set("views", "veiws");
app.set("veiw engin", "ejs");
//4
app.get("/hello", function (rep, res) {
  res.end(`<h1> Hello World</h1>`);
});

const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function () {
  console.log(`hammasi meni nazoratim ostida: ${PORT}`);
});
