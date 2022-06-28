const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const tasks = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

require("dotenv").config();

//Middleware
app.use(express.static("./public"));
app.use(express.json());

//Routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.port;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on Port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
