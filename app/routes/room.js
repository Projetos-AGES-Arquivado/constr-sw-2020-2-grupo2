var express = require('express')

module.exports = function(app){   
    var router = express.Router();
    var controller = app.controllers.room;

    router.get('/resource', controller.index);
    router.get('/resource/:id', controller.findById);
    router.get('/resource', controller.findByAtributes);
    router.post('/resource', controller.createRoom);
    router.patch('/resource/:id',controller.updateRoom);
    router.put('/resource/:id',controller.replaceRoom);
    router.delete('/resource/:id', controller.deleteRoom);
    
    app.use('/', router)
}