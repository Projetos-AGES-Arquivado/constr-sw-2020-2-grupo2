var express = require('express'); 
var bodyParser = require('body-parser');
var load = require('express-load');

const PORT = 3001;

module.exports = function(){
    var app = express();

    app.set('port', PORT);
    app.use(bodyParser.json());

    load('models',{cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
}