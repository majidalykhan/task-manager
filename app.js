const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const tasks = require("./routes/tasks");

require("dotenv").config();

//Middleware
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

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
