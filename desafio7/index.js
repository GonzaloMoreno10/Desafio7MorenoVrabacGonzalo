const express = require("express");
const app = express();

//Middlewares
app.use(require("./routes"));


//Listen
app.listen(8080,(req,res)=>{
    console.log("Server listen on port 8080");
});
