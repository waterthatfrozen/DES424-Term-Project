exports.helloWorld = (req, res) => {
    res.send({message: 'Hello World!', timestamp: new Date().toISOString()});
};