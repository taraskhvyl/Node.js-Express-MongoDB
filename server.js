const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({
  path: './config.env'
});

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log("DB connection successful"));

process.on('uncaughtException', (error) => {
  console.log(error.name, error.message);
  process.exit(1)
})

const app = require("./app");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (error) => {
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1)
  })
})