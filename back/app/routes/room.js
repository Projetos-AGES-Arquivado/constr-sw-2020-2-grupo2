var express = require('express')

module.exports = function(app){   
    var router = express.Router();
    var controller = app.controllers.room;

    router.get('/room/:id', controller.findById);
    router.get('/room', controller.getByAtributes);
    router.post('/room', controller.createRoom);
    router.put('/room/:id',controller.replaceRoom);
    router.patch('/room/:id',controller.updateRoom);
    router.delete('/room/:id', controller.deleteRoom);

    app.use('/', router)
}