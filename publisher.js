const redis = require('redis');
const publisher = redis.createClient();

const channel = 'status'; //channel named status

async function publish() {
    console.log(`Started ${channel} channel publisher...`)
    publisher.publish(channel, 'free'); //publish the “free” message to the status channel
}


publish();