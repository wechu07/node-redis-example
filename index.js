const redis = require('redis');
const client = redis.createClient();
const express = require('express');
const app = express();

client.on('connect', function () {
    console.log('Connected!');
});

//strings -> key value pairs passed as ..args, an array
client.set(['framework', 'ReactJS'], function (err, reply) {
    console.log(reply); // OK
});

//accessing the strings
client.get('framework', function (err, reply) {
    console.log(reply); // ReactJS
});


client.hmset('frameworks_hash', 'javascript', 'ReactJS', 'css', 'TailwindCSS', 'node', 'Express', function (err, reply) {
    console.log(reply); // OK
});

client.hgetall('frameworks_hash', function(err, object){
    console.log(object); // { javascript: 'ReactJS', css: 'TailwindCSS', node: 'Express' }
})

client.rpush(['frameworks_list', 'ReactJS', 'Angular'], function (err, reply) {
    console.log(reply); // 2
});

app.listen(3000, () => {
    console.log('Serving on port 3000')
})