const mongoose = require('mongoose')
const schema = mongoose.Schema;

//Events schema 

const event = mongoose.Schema({

    title:String,
    date:String,
    description:String,
    time:String,
    // img:{
    //     type:Buffer,
    //     contentType:String
    // },
    address:String,
    city:String,
    genre:String,
    website:String,
    intrestedUser:[{
        type : schema.ObjectId,
        ref : 'user'
    }]

    //registered_user_count=Integer
})


module.exports = mongoose.model('events',event)
