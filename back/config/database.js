var mongoose = require('mongoose');
 
module.exports = function(url){
    mongoose.connect(url,{ useNewUrlParser: true });

    mongoose.set('useCreateIndex', true);

    mongoose.connection.on('connected', function(){
        console.log('Mongoose connected on ' + url);
    });

    mongoose.connection.on('disconnected', function(){
        console.log('Mongoose disconnected! ');
    });

    mongoose.connection.on('error', function(err){
        console.log('Mongoose Error connection! ' + err);
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log('Mongoose exit.');
            process.exit(0);
        })
    })
}