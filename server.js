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
    cors = require('cors'),
    app = express();

const PATH = __dirname;
const PORT = process.env.PORT || 5500;

const corsOptions ={
    origin:'*',
    credentials: true,
    optionSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
};

app.use(cors(corsOptions));

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.get('/listVideo', (req,res) => {res.sendFile(path.join(PATH, '/videoUpload/videoList.html')); });
app.get('/videoPlayer', (req,res) => {res.sendFile(path.join(PATH,'/videoUpload/videoPlayer.html')); })

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

