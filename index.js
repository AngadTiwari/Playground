const express = require('express')
const app = express()
const port = 3000

var redis = require("redis"),
    client = redis.createClient();

client.on('ready',function() {
    console.log("Redis is ready");
    client.set('hits', '0', (err, reply) => {
        console.log('hits: '+reply);
    });
});
client.on("error", function (err) {
    console.log("Error " + err);
});

app.get('/', (req, res) => {
    client.get('hits', (err, reply) => {
        console.log('hits: '+reply);
        if(isNaN(reply)) {
            hits = 1;
        } else {
            hits = parseInt(reply) + 1;
        }
        client.set('hits', ''+hits, (err, reply) => {
            res.send('Playground app hit: '+hits);
        });
    });
})

app.listen(port, () => {
    console.log(`Playground app listening on port ${port}!`)
})