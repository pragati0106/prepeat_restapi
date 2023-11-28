
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const key=process.env.JWT_SECRET

// console.log(key)


module.exports =  async (req,res,next)=>{

    const x=req.headers.authorization;
    
    if(!x){
        return res.status(401).json({
            message:"Authorization failed"
        });
    }
    else{
        const token = req.header('authorization').replace('Bearer ', '')
        
            if(!token){
                return res.status(401).json({
                    message: "Authorization failed - Invalid token format"
                })
            }
            try{
                // console.log("Token:", token);
                const decoded=jwt.verify(token, key);
                // console.log(decoded)
                req.userData=decoded;
                // console.log(req.userData);
                next();
            }catch(err){
                console.log(err)
                return res.status(401).json({
                    message:"Auth failed"
                })
            }
    }

}
