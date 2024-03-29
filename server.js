const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

const path = require("path");

const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const http = require("http");

const server = http.createServer(app);

const DB = process.env.DBURI.replace("<PASSWORD>", process.env.DBPASSWORD).replace("<DBNAME>", process.env.DBNAME);

mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB connection is successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

app.get("/", (req,res)=>{
  res.send('<a href="/auth/login/google">Authenticate with google </a>')
});

app.use((req, res, next) => {
  res.status(404).send('Page not found');
});
