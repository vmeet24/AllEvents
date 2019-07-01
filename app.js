const express = require ('express')
const morgan = require ('morgan')
const bodyParser= require ('body-parser')
const cors = require ('cors')
const mongoose =  require ('mongoose')
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const favicon = require('serve-favicon');
// const logger = require('morgan');44444

const routes = require('./routes')
/*we create these constants to import the above modules using keyword "require". */

const app=express()
//app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser({extended:true}))
app.use(async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credential', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
    next();
});
app.use(express.static(__dirname + '/static'));
/*Above code is used to use a particular module imported above.  */

// const storage = multer.diskStorage({ //multers disk storage settings
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         var datetimestamp = Date.now();
//         cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
//     }
// });
// const upload = multer({ //multer settings
//                 storage: storage
//             }).single('file');

// app.post('/upload', function(req, res) {
//     upload(req,res,function(err){
//         if(err){
//             res.json({error_code:1,err_desc:err});
//                 return;
//         }
//         res.json({error_code:0,err_desc:null});
//         })
// });


// var sess;

// app.get('/',(req,res) => {
//     sess = req.session;
//     if(sess.username) {
//         return res.redirect('/admin');
//     }
//     res.sendFile('');
// });
mongoose.connect('mongodb://127.0.0.1:27017/todo',{useNewUrlParser : true})
.then(()=>{console.log('database sucessfully connected')})
.catch((err)=>{console.log(err)})

app.get('/',(req,res)=>{res.send({"home":"Welcome..."})})
app.get('/getmsg',(req,res)=>{res.send({"message":"Hello World!"})})

app.listen(8000,'localhost',()=>{console.log('server started!')})

routes(app)