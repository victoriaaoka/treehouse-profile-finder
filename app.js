//problem: We need a simple way to look at a user's badge count and JS points from a web browser.
//Solution: Use Node.js to perfowm the profile search and serve our templates via HTTP.

// create a web server.
const router = require('./router.js');
const http = require('http');
//define the port
const port = 3000;
const server = http.createServer((request, response) => {
  //Register the routes
  router.home(request, response);
  router.user(request, response);
});
server.listen(port);
console.log('Server listening at http://workspace url/');

