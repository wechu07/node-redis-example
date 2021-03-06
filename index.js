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
client.sadd(['frameworks_set', 'ReactJS', 'Angular', 'Svelte', 'VueJS', 'VueJS'], function (err, reply) {
    console.log(reply); // 4
});
// Here, the length of the set is four, because Redis removes the VueJS duplicate as expected.

client.smembers('frameworks_set', function (err, reply) {
    console.log(reply); // [ 'Angular', 'ReactJS', 'VueJS', 'Svelte' ]
}); //the order is not preserved while retrieving the members.



//Time for operations

//Checking for existing keys
client.exists('framework', function (err, reply) {
    if (reply === 1) {
        console.log('Exists!'); //Exists!
    } else {
        console.log('Doesn\'t exist!');
    }
});

//Deleting and expiring keys
client.del('frameworks_list', function (err, reply) {
    console.log(reply); // 1
});

//expiration time to an existing key
client.set('status', 'logged_in');
client.expire('status', 300);

//incrementing and decrementing keys
client.set('working_days', 5, function () {
    client.incr('working_days', function (err, reply) {
        console.log(reply); // 6
    });
});

//The incr() function increments a key value by 1. If you need to increment by a different amount, you can use the incrby() function. Similarly, to decrement a key you can use functions like decr() and decrby().

app.listen(3000, () => {
    console.log('Serving on port 3000')
})