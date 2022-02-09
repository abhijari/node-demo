const express = require("express");
require("../src/db/mongoose.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
