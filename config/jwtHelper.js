const jwt = require("jsonwebtoken");

const verifyJwtToken = (req,res,next)=>{
    var token;
    console.log(req.headers);
    if('authorization' in req.headers){
        token = req.headers['authorization'].split(' ')[1];
        console.log("yo bitch " + token); 
    }
    if(!token)
    {
        console.log(token);
        return res.status(403).send({auth: false,message : "no token provided"});
    }
    else{
        jwt.verify(token,"MY_SECRET",(err,decode)=>{
            if(err){
                return res.status(500).send({auth: false,message : "token auth failed"});
            }
            else{
                console.log(decode._id);
                req._id =decode._id;
                req.events = decode.addedEvents;
                next();
            }
        });
    }
}
module.exports = {
    verifyJwtToken
}