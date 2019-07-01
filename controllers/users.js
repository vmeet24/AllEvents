const user = require("../models/user")
const event = require("../models/event")
const get_all_users = (req, res) => {

    user.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    })
}

const signup = (req, res) => {

    const params = req.body
    
    user.find({username: params.username}).then((err, result) => {
        if (result)
             {
                console.log("bey yaar",result);
                res.send("0")//user login failed
             }
        else if(!result){
            console.log("na ayu");
            const add_user = new user({
                username: params.username,
                password: params.password,
                city: params.city,
                name: params.name,
                mobile : params.mobile
            }) 
            add_user.save()
                .then((result) => {
                    res.send("1")
                })
                .catch((err) => {
                    console.log(err);
                    
                    res.send("0")
                })
        }
    }).catch(err=>{
        console.log(err);
        
    })
}

const login = (req, res) => {
    const params = req.body
    user.findOne({ username: params.username, password: params.password }, (err, result) => {
        console.log(result)
        if (result.length == 0)
            res.send("0")//user login failed
        else if (result) {
            var token = "";
            console.log("login thay",result);
            
            token = result.generateJwt();
            res.json({
                "token": token
            });
        }
        //res.send("1")//User login successfully
    })
}

const userProfile =(req,res)=>{
    console.log("yo workind", req.events);
    
    user.findOne({_id : req._id}).populate('addedEvents').exec((err,user1)=>{
        if(!user1)
        { 
             return res.status(404).json({status: false,message:"user not found"});
        }
        else{
            console.log("works",user1);
            // event.findById({_id:user.addedEvents[]})
            return res.status(200).json({status:true,user1,events: user1.addedEvents.name})
        }
    })
}
module.exports = {
    get_all_users,
    signup,
    login,
    userProfile
}