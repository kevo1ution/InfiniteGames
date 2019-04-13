/**Sources
 * tutorial: https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d
 * future referece mongodb scaling: https://s3.amazonaws.com/quickstart-reference/mongodb/latest/doc/MongoDB_on_the_AWS_Cloud.pdf
 */



//setup the express app
const express = require('express');
const app = express();
//get string generator
const uuid = require('uuid/v4');
//set up sessions
const session = require('express-session');
//filestore for storing sessions
const FileStore = require('session-file-store')(session);
//bodyparser is middlware so express can interpret json string
const bodyParser = require('body-parser');
//setup passport and local strategy
const passport = require('passport');
const LocalStrategy = require('passport-local');

const users = [
    {id: '2f24vvg', email: 'test@test.com', password: 'password'}
];

//passport js; configure to use local strategy
passport.use(new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) => {
        console.log('Passport Local Strategy callback:');
        //make call to database to search for user based on username and email address
        
        //implement me in the future!
        const user = users[0];
        if(email === user.email && password === user.password){
            console.log('Authentication success!');
            return done(null, user);
        }

    }

));
//passport serializing and deserializing user
passport.serializeUser((user, done) => {
    console.log('Passport serializeUser callback:');
    console.log('User id is saved to session file store here');
    done(null, user.id);
});
passport.deserializeUser((id,done)=>{
    console.log('Passport deserializer');
    console.log(`The user id passport saved in the session file store is: ${id}`);
    const user = users[0].id === id ? users[0] : false;
    done(null, user);
});


//configure middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    genid: (req) => {
        console.log('SESSION MIDDLEWARE:');
        console.log(req.sessionID);
        return uuid();
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    expires: new Date(Date.now() + (30 * 86400 * 1000))
}));
app.use(passport.initialize());
app.use(passport.session());

//routingsetup
//homepage route
app.get('/', (req, res) =>{
    const uniqueId = uuid();
    console.log(req.sessionID);
    res.send(`${uniqueId}`);
});

//login get and post routes
app.get('/login', (req,res)=>{
    console.log('APP.GET /login callback:');
    console.log(req.sessionID);
    res.send('you got login page!');
});

app.post('/login', (req,res, next)=>{
    console.log('APP.POST /login callback:');

    //use passportauthentication
    passport.authenticate('local', (err, user, info) => {
        console.log('Passport authenticate callback:');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
        console.log(`req.user: ${JSON.stringify(req.user)}`);
        req.login(user, (err) => {
            console.log('Req Login callback:');
            console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
            console.log(`req.user: ${JSON.stringify(req.user)}`);
            return res.send('You were authenticated & logged in!\n');
        });
    })(req, res, next);
});

//get route that requires authentication
app.get('/authrequired', (req, res) => {
    console.log('App GET /authrequired callback:');
    console.log(`User authenticated? ${req.isAuthenticated()}`);
    if(req.isAuthenticated()){
        res.send('You are allowed into authentication endpoint');
    }else{
        res.redirect('/');
    }
});

//start app to listen on port 3000
app.listen(3000, ()=>{
    console.log('Listening on port 3000!');
});