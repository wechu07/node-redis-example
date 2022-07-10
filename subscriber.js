const redis = require('redis');
const subscriber = redis.createClient();

const channel = 'status'; //define the same channel as in publisher.js

subscriber.subscribe(channel, (error, channel) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`Subscribed to ${channel} channel. Listening for updates on the ${channel} channel...`); 
}); // subscribe to that channel

subscriber.on('message', (channel, message) => {
    console.log(`Received message from ${channel} channel: ${message}`);
}); // listen to the message event