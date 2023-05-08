const express = require("express");
const app = express();
const authenticationRouter=require('./routes/authenticationRouter')
const mongoose=require('./db/db.js')

app.use(express.json())
app.use('/authentication', authenticationRouter)

app.listen(3000, () => console.log("server started"));