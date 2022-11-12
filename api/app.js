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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set the static files
app.use(express.static(PATH));
http.createServer(app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (http://localhost:${PORT})`);
});

app.get('/', (req, res) => { require('./helloWorld')(req, res); });
app.get('/listStreamingPath', (req, res) => { require('./listStreamingPath')(req, res); });

app.post('/login', (req, res) => { require('./login')(req, res); });
app.post('/signUp', (req, res) => { require('./signUp')(req, res); });
app.post('/videoUpload', (req, res) => { require('./videoUpload')(req, res); });

const createVideoAsset = require('./createVideoAsset');
//multer({storage: multer.memoryStorage()}).single('file')
app.post('/createVideoAsset', multer({storage: multer.memoryStorage()}).single('file'), (req, res) => { console.log(req); createVideoAsset(req, res); });

app.delete('/deleteVideoAsset', (req,res) => { require('./deleteVideoAsset')(req,res); });

// 404 Error Route
app.use((req, res, _next) => { res.status(404).send({error: 'Not found what you are looking for.'}); });

// 500 Error Route
app.use((err, req, res, _next) => {
    res.status(err.status || 500);
    res.send(err.message ? {error: err.message} : {error: 'Internal server error, please try again.'});
});