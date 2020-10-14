var express = require('express')

module.exports = function(app){   
    var router = express.Router();
    var controller = app.controllers.room;

    router.get('/resource', controller.index);
    router.get('/resource/:id', controller.room);
    router.post('/resource', controller.newRoom);
    router.delete('/resource/:id', controller.remove);

    app.use('/', router)
}