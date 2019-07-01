module.exports = (app) => {
    // console.log("hello")
    const eventsController = require('./controllers/events')
    const userController = require('./controllers/users')
    const jwtHelper = require('./config/jwtHelper')
    app.get('/get_userProfile',jwtHelper.verifyJwtToken,userController.userProfile)
    app.post('/get_all_events',eventsController.getAll)
    app.post('/add_event',jwtHelper.verifyJwtToken,eventsController.add_event)
    app.get('/get_all_users',userController.get_all_users)
    app.post('/signup',userController.signup)
    app.post('/login',userController.login)
    app.post('/delete_event',jwtHelper.verifyJwtToken,eventsController.delete_event)
    app.post('/intrested_user',eventsController.intrested_user)
}