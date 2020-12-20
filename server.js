const app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');

const  DEV_PORT  = process.env.DEV_PORT;
const  DB_URL  = process.env.DB_URL;
console.log (DB_URL)
const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex:true
};

mongoose.connect(DB_URL, connectionOptions).then(()=>{
  console.log("Db connection succesfull");
}).catch(()=>{
  console.log("DB connection failed");
})

app.listen(DEV_PORT, () => {
  console.log(`[+] Server has started: http://localhost:${DEV_PORT}/`);
});

