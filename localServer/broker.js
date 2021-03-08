const mosca = require('mosca')
// const Auth0Mosca = require('auth0mosca');

const settings = {
  port: 9999,
};

//'Thermostats' is a Database connection where all devices are registered.
// var auth0 = new Auth0Mosca('https://eugeniop.auth0.com', '{Your Auth0 ClientID}', '{Your Auth0 Client Secret}','Thermostats');

//Setup the Mosca server
const server = new mosca.Server(settings);

// //Wire up authentication & authorization to mosca
// server.authenticate = auth0.authenticateWithCredentials();
// server.authorizePublish = auth0.authorizePublish();
// server.authorizeSubscribe = auth0.authorizeSubscribe();

server.on('ready', setup);

// Fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}

server.on('clientConnected', function(client) {
  console.log('New connection: ', client.id );
});