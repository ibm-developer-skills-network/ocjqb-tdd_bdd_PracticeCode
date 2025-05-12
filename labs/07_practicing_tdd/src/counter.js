const express = require('express');
const statusCodes = require('./status');

const app = express();

let COUNTERS = {};

app.use(express.json());

app.post('/counters/:name', (req, res) => {
    const name = req.params.name;
    console.log(`Request to create counter: ${name}`);
    
    if (name in COUNTERS) {
        return res.status(statusCodes.HTTP_409_CONFLICT)
            .json({ message: `Counter ${name} already exists` });
    }
    
    COUNTERS[name] = 0;
    res.status(statusCodes.HTTP_201_CREATED).json({ [name]: COUNTERS[name] });
});

module.exports = app;
