//setup express app
var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');

//setup credentials
var app = express();
var httpsServer = https.createServer({
    key: fs.readFileSync('./sslcert/csr.pem'),
    cert: fs.readFileSync('./sslcert/server.crt')
}, app);

//force redirect for non secure requests
var httpServer = http.createServer(app);
httpServer.listen(8080, ()=>{
    console.log("http service starting, for redirect");
});
httpsServer.listen(9000, ()=>{
    console.log("https (SECURE) service starting");
});

//setup app to force redirect
/*app.use((req,res,next)=>{
    if(req.secure){
    }else{
        res.redirect('https://' + req.headers.host + req.url);
    }
})
*/

app.get('/', function(req,res){
    res.send('secure communication!');
});

module.exports = app;