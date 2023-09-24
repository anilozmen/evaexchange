const express = require("express")
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/api/v1/users", require('./routes/users'));
app.use("/api/v1/shares", require('./routes/shares'));

module.exports = app;