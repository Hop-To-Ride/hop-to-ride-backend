const express = require("express");
const app = express();
const mongoose = require("./db/db.js");

app.use(express.json());

const usersRouter = require("./routers/users.js");
app.use("/users", usersRouter);

app.listen(3000, () => console.log("server started"));
