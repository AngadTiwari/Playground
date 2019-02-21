const express = require('express')
const app = express()
const port = 3000

var redis = require("redis"),
    client = redis.createClient(6379, 'redis');

client.on('ready',function() {
    console.log("Redis is ready");
});
client.on("error", function (err) {
    console.log("Error " + err);
});

app.get('/', (req, res) => {
    client.get('hits', (err, reply) => {
        if(isNaN(reply) || reply === null) {
            hits = 1;
        } else {
            hits = parseInt(reply) + 1;
        }
        client.set('hits', ''+hits, (err, reply) => {
            res.send('Playground app hits: '+hits);
        });
    });
})

app.listen(port, () => {
    console.log(`Playground app listening on port ${port}!`)
})