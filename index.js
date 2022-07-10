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

//working with hashes (objects)
client.hmset('frameworks_hash', 'javascript', 'ReactJS', 'css', 'TailwindCSS', 'node', 'Express', function (err, reply) {
    console.log(reply); // OK
});

//alternative?
// client.hmset('frameworks_hash', {
//     'javascript': 'ReactJS',
//     'css': 'TailwindCSS',
//     'node': 'Express'
// });

//accessing?
client.hgetall('frameworks_hash', function(err, object){
    console.log(object); // { javascript: 'ReactJS', css: 'TailwindCSS', node: 'Express' }
})

//lists now, passed as an array
client.rpush(['frameworks_list', 'ReactJS', 'Angular'], function (err, reply) {
    console.log(reply); // 2
});

//accessing the list
client.lrange('frameworks_list', 0, -1, function (err, reply) {
    console.log(reply); // [ 'ReactJS', 'Angular' ]
});

//Sets are similar to lists, but the difference is that they don’t allow duplicates. So, if you don’t want any duplicate elements in your list, you can use a set, they say


app.listen(3000, () => {
    console.log('Serving on port 3000')
})