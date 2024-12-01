const JWT=require("jsonwebtoken");

const JWT_SECRET= process.env.JWT_SECRET;
const fetchUser=(req,res,next)=>{
    //
    const token=req.header("auth-token");
    if(!token){
        return res.status(401).send(" no token please authenticate using valid token")  
    }
    try {
        const data=JWT.verify(token,JWT_SECRET)
        req.user=data.user;
        // console.log("Decoded user ID:", req.user.id);
        // console.log("req.user:", req.user);
        next()
    } catch (error) {
        console.log(error.message);
        return res.status(401).send("please authenticate using valid token")  
    }
}
        
module.exports=fetchUser;