const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const usersRoute = require("./api");
const path = require("path")
dotenv.config();
const port = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Data base connected");
  })
  .catch((err) => {
    console.log(err);
  });
  
  app.use(cors());
  app.use(express.json());

  app.use("/api", usersRoute);

  __dirname = path.resolve();
  
  if(process.env.NODE_ENV == 'production' ){
    app.use(express.static(path.join(__dirname, "client/build")))
    app.use((req, res, next) => {
      res.sendFile(path.join(__dirname,"client", "build", "index.html"));
    });
  }
 
  app.listen(port, () => {
    console.log(`Server is running at ${port}...`);
  });