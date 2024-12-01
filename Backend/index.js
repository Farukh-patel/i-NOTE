require('dotenv').config();
const {ConnectToMongo}=require("./db")
const path = require("path");

const mongoURI = process.env.MONGO_URI;
ConnectToMongo(mongoURI);
const  express=require("express");
const app=express();
var cors=require("cors");
const port=5000;
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hellow")
})
app.use("/api/auth", require("./Routes/auth"))
app.use("/api/notes", require("./Routes/notes"))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port,()=>{console.log(`server started a port localhost:${port}`)})