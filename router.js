const Profile = require('./profile.js');
const renderer = require('./renderer.js');
const querystring = require('querystring');
const commonHeader = {'Content-Type': 'text/html'};

// Handle the HTTP routes: GET and POST
function homeRoute(request, response){
  //if the url === '/' && GET
  if(request.url === '/'){
    if(request.method.toLowerCase() === "get") {
      //show search
      response.writeHead(200, commonHeader);
      renderer.view('header', {}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    }else {
      //if url == "/" && POST
      
      //get the post data from body
      request.on("data", function(postBody) {
        //extract the username
        const query = querystring.parse(postBody.toString());
        //redirect to /:username
        response.writeHead(303, {'location': `/${query.username}`});
        response.end();
      });
      
    }
  }
  //if the url === '/' && POST
     //redirect to /:username
}

// Handle the HTTP route: GET : /username
function userRoute(request, response){
  //if url === '/...'
  const username = request.url.replace('/', '');
  if(username.length > 0){
    response.writeHead(200, commonHeader);
    renderer.view('header', {}, response);
    
    //get json from Treehouse
    const studentProfile = new Profile(username);
    //on 'end' 
    studentProfile.on("end", profileJSON => {
      
      //store the needed values
      const values ={
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      //show profile
      renderer.view('profile', values, response);
      renderer.view('footer', {}, response);
      response.end();
    });
    //on 'error'
   studentProfile.on("error", error => {
     //show the error 
     renderer.view('error', {errorMessage: error.message}, response);
     renderer.view('search', {}, response);
     renderer.view('footer', {}, response);  
     response.end();
   });


  }

}

module.exports.home = homeRoute;
module.exports.user = userRoute;

