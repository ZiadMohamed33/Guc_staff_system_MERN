const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');





//db connection
const  DEV_PORT  = process.env.DEV_PORT;
const  DB_URL  = process.env.DB_URL;
console.log (DB_URL)
const connectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 

};

mongoose.connect(DB_URL, connectionOptions);


app.listen(DEV_PORT, () => {
  console.log(`[+] Server has started: http://localhost:${DEV_PORT}/`);
});
