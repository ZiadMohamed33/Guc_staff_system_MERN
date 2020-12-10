//added signup
// Added login 

//express
const express=require('express');
const app =express();

//3ashan n2ra elposts
const bodyParser=require("body-parser");
app.use(bodyParser.json());


//port connection
const port=process.env.PORT || 2000 ;
app.listen(port,()=>{
console.log(`listening on port ${port}`);
});


//db connect
const mongoose =require('mongoose');
const connectionParams={
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true 
}
const URL = "mongodb+srv://zizo33:19989898@cluster0.hfmnd.mongodb.net/Stalin?retryWrites=true&w=majority";
mongoose.connect(URL,connectionParams).then(()=>{
   console.log("Db connection succesfull");
}).catch(()=>{
   console.log("DB connection failed");
});


//middleware


const router=require('./routes/Users');

app.use('/Users',router);
//check
app.get('/',(req,res)=>{
   res.send("We are online");
   });

