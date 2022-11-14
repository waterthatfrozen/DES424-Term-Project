const http = require('http'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    axios = require('axios'),
    dotenv = require('dotenv'),
    path = require('path'),
    cors = require('cors'),
    multer = require('multer'),
    app = express();
dotenv.config();

const PATH = __dirname;
const PORT = process.env.PORT || 5000;

const corsOptions ={
    origin:'*', 
    credentials: true,
    optionSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
};

app.use(cors(corsOptions));

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ limit: '100mb', extended: true, parameterLimit: 50000 }));

// set the static files
app.use(express.static(PATH));
http.createServer(app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (http://localhost:${PORT})`);
});

app.get('/', (req, res) => { require('./helloWorld')(req, res); });
app.get('/listStreamingPath', (req, res) => { require('./listStreamingPath')(req, res); });
app.get('/listUserVideo', (req, res) => { require('./listUserVideo')(req, res); });
app.get('/fetchVideo', (req, res) => { require('./fetchVideo')(req, res); });
app.get('/fetchAllUsers', (req, res) => { require('./fetchAllUsers')(req, res); });
app.get('/fetchUser', (req, res) => { require('./fetchUser')(req, res); });

app.post('/login', (req, res) => { require('./login')(req, res); });
app.post('/signUp', (req, res) => { require('./signUp')(req, res); });
app.post('/deactivateUser', (req, res) => { require('./deactivateUser')(req, res); });
app.post('/activateUser', (req, res) => { require('./activateUser')(req, res); });

const createVideoAsset = require('./createVideoAsset');
//multer({storage: multer.memoryStorage()}).single('file')
app.post('/createVideoAsset', multer({storage: multer.memoryStorage()}).single('file'), (req, res) => { console.log("REQUEST RECEIVED!"); createVideoAsset(req, res); });
app.post('/likeVideo', (req, res) => { require('./likeVideo')(req, res); });

app.delete('/deleteVideoAsset', (req,res) => { require('./deleteVideoAsset')(req,res); });

// 404 Error Route
app.use((req, res, _next) => { res.status(404).send({error: 'Not found what you are looking for.'}); });

// 500 Error Route
app.use((err, req, res, _next) => {
    res.status(err.status || 500);
    res.send(err.message ? {error: err.message} : {error: 'Internal server error, please try again.'});
});