const mongoose=require("mongoose");

const ConnectToMongo=(mongoURL)=>{
    mongoose.connect(mongoURL).then(() => {
        console.log("mongoDB Connected succesfully !!")
    }).catch(()=>{console.log("Error in connecting to mongoDB ")});
};

module.exports={ConnectToMongo};
