const http = require("http");
const mongodb = require("mongodb");
let db;
const connectionString =
  "mongodb+srv://Akobir:9esID8qNQwq8rw5F@cluster0.xo8q3dl.mongodb.net/Reja";
mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR:", err);
    else {
      console.log("mongodb installing");
      module.exports = client;

      const app = require("./app");
      const server = http.createServer(app);
      let PORT = 3000;
      server.listen(PORT, function () {
        console.log(
          `hammasi meni nazoratim ostida: ${PORT}, http://localhost:${PORT}`,
        );
      });
    }
  },
);
