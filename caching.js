const redis = require('redis');
const express = require('express');
const client = redis.createClient();
const axios = require('axios');

const app = express();

const USERS_API = 'https://jsonplaceholder.typicode.com/users/';

// users are retrieved without caching the result. 
// Whenever we send that request again, the users data will be retrieved anew.

// nodemon caching (or node caching)
// localhost:4000/users
app.get('/users', (req, res) => {

    try {
        axios.get(`${USERS_API}`).then(function (response) {
            const users = response.data;
            console.log('Users retrieved from the API');
            res.status(200).send(users);
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

//In the second one, a check is made first to see if the requested data is already stored in the cache. 
// If it is, then the data is retrieved from Redis. Otherwise, if the users data isn’t stored in the cache, it will be first retrieved from the API call. 
// In this case, the retrieved data will be also stored in the cache so that the next time it’s requested it will be retrieved faster.

// nodemon caching (or node caching)
// localhost:4000/cached-users
app.get('/cached-users', (req, res) => {

    try {
        client.get('users', (err, data) => {

            if (err) {
                console.error(err);
                throw err;
            }

            if (data) {
                console.log('Users retrieved from Redis');
                res.status(200).send(JSON.parse(data));
            } else {
                axios.get(`${USERS_API}`).then(function (response) {
                    const users = response.data;
                    client.setex('users', 600, JSON.stringify(users));
                    console.log('Users retrieved from the API');
                    res.status(200).send(users);
                });
            }
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});