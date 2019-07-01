const events = require("../models/event")
// const events = eventurl.events
// console.log(events)
const user = require("../models/user"); 
//fetching event data API
const getAll = (req, res) => {
   let x;
    param = req.body;
user.findOne({_id : param.userid}).then(result=>{
    x=result.intrestedEvents;
    console.log("yo",x);
}).catch(err=>{console.log(err);
})
    events.find().then((result) => {
        console.log("tya",x);
        res.send({result1 : result ,intEvent : x})
    }).catch((err) => {
        res.send(err)
    })
}
//Adding Event API
const add_event = (req, res) => {
    const params = req.body
    console.log(req.body);

    // let filePath;
    // let form = new formidable.IncomingForm({
    //     uploadDir: __dirname,
    //     keepExtensions: true
    // });

    // form.parse(req);

    // form.on('fileBegin', function (name, file){
    //     file.path = filePath = __dirname + "/" + file.name;
    // });

    // form.on('file', function (name, file){

    //     let image = new db.Image;
    //     image.img.data = fs.readFileSync(file.path);
    //     image.name = file.name;
        
    //     image.img.contentType = 'image/jpg';
    //     image.save().then((data) => {
    //         res.json({
    //             success: true,
    //             data: file.name,
    //             _id: data._id
    //         });
    //         fs.unlinkSync(filePath);
    //         return
    //     }).catch(err => {
    //         console.error(err); 
    //         res.sendStatus(500);
    //         return;
    //     })

    // });

    
    const new_Event = new events({
        title: params.title,
        description: params.description,
        date: params.date,
        time: params.time,
        address: params.address,
        city: params.city,
        genre: params.genre,
        website: params.website

    })

    new_Event.save()
        .then((result) => {
            console.log("hello bitch", result);
            user.findById(req._id).then(u => {
                u.addedEvents.push(result._id);
                u.save();
            })
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
}

const delete_event = (req, res) => {
    params= req.body;
    console.log("yayaya",params);
    // console.log("yayaya",req.bodt);
    
     events.remove({_id : params.eventid}).then((result)=>{
        console.log(result);
    }).catch(err=>{console.log(err);
    })
    user.findOne({_id : params.userid}).then(result=>{
        console.log(result.addedEvents);
            result.addedEvents.forEach(element =>{
                if(element == params.eventid)
                {
                    let index = result.addedEvents.indexOf(element);
                    result.addedEvents.splice(index,1);
                    console.log(result.addedEvents);
                }
              
            })
            result.save();
    })

}
let i;
let userIntEvents;
const intrested_user = (req,res)=>{
    i=0;
    param = req.body
    console.log(param.userid);
    events.findOne({_id : param.eventid}).then(result=>{
        console.log(result);  
        result.intrestedUser.forEach(element=>{
            console.log("users",element);
            if(element == param.userid){
              i=1;
            }
        }) 
        if(i==0){  
            result.intrestedUser.push(param.userid);
           user.findOne({_id : param.userid}).then(result=>{
               
               result.intrestedEvents.push(param.eventid);
               userIntEvents=result.intrestedEvents
               //console.log("Event added");
               result.save();
           }).catch(err=>{console.log(err);
           })
           //console.log(userIntEvents);
            result.save();  
            res.send(userIntEvents) 
        }
        else{
               res.send(JSON.stringify("tu intrested che already bhundiya"));
               
        }
         
    }).catch(err=>{
        console.log(err);
        
    })
}

module.exports = {
    getAll,
    add_event,
    delete_event,
    intrested_user
}
