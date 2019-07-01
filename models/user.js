const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose=require('mongoose');
const schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const user = mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    username:{
        type:String,
        unique:true,
        required:true    
    },
    password:{
        type:String,
        required:true    
    },
    city:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        unique:true,
        required:true
    },
    addedEvents:[{
        type: schema.ObjectId,
        ref : "events"
    }],
    intrestedEvents:[{
        type: schema.ObjectId,
        ref : "events"
    }]


    // },
    // hash:String,
    // salt:String 
});

user.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      username: this.username,
      city: this.city,
      addedEvents: this.addedEvents,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };


module.exports=mongoose.model('user', user);