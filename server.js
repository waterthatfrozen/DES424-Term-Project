const { Cookie } = require('express-session');
const http = require('http'),
    fs = require('fs'),
    express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    axios = require('axios'),
    dotenv = require('dotenv'),
    path = require('path'),
    app = express();

const PATH = __dirname;
const PORT = process.env.PORT || 5000;

// check for session is expired or not
function checkTokenValid(req, res, next) {
    if (req.session.token) {
        let now = new Date().getTime();
        let expires = new Date(req.session.token._expires).getTime();
        if (expires > now) {
            next();
        }else{
            req.session = null;
            res.status(401).redirect('/401');
        }
    }else{
        res.status(401).redirect('/401');
    }
}

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// session settings
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

// remove the session cookie on the server when it expires
app.use((req, _res, next) => {
    if(req.session.token){
        let now = new Date().getTime();
        let tokenExpiry = new Date(req.session.cookie._expires).getTime();
        if (now > tokenExpiry) { req.session = null; }
    }
    next();
});

// remove the back button from the browser
app.use((_req, res, next) =>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    next();
});

// prevent browser for calling static files
app.use((req, res, next) => {
    if (req.url.indexOf('.html') > -1) { res.status(404).redirect('/404'); }
    else { next(); }
});

// set the static files
app.use(express.static(PATH));
http.createServer(app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (http://localhost:${PORT})`);
});

// set the routes
app.get('/', (req, res) => { res.send({message: 'Welcome to QikVid API'}); });
app.get('/demoLanding', (req,res) => { res.sendFile(path.join(PATH, '/videoUpload/demoLanding.html')); });
app.get('/uploadDemo', (req, res) => { res.sendFile(path.join(PATH, '/videoUpload/listener-axios-cdn.html')); });
app.get('/uploadAssetDemo', (req,res) => {res.sendFile(path.join(PATH, '/videoUpload/upload-ams-asset.html')); });
app.get('/playVideo', (req,res) => {res.sendFile(path.join(PATH,'/videoUpload/videoPlayer.html')); })

// api routes
const playground = require('./api/playground');
app.get('/api/hello', playground.helloWorld);
app.get('/api/testBackend', (req, res) => { res.send({message: 'Express is connected!'}); });

// Error Code Route
app.get('/401', (req, res) => { res.send({error: 'Unauthorized'}); });
app.get('/404', (req, res) => { res.send({error: 'Not found what you are looking for.'}); });

// 404 Error Route
app.use((req, res, _next) => { res.status(404).redirect('/404'); });

// 500 Error Route
app.use((err, req, res, _next) => {
    res.status(err.status || 500);
    res.send(err.message ? {error: err.message} : {error: 'Internal server error, please try again.'});
});

