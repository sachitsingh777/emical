const jwt=require("jsonwebtoken")

const logged=(req,res,next)=>{
    let token=req.headers.authorization
    if(token){
        var decoded = jwt.verify(token.split(" ")[1], 'mock')
        if(decoded){
            req.body.emiID=decoded.userID
            req.body.name=decoded.name
            req.body.email=decoded.email
            next()
        }else{
            res.status(200).send({"msg":"Login please"})
        }
    }else{
        res.status(200).send({"msg":"Login please"})
    }
}

module.exports={logged}