var express = require('express')

module.exports = function(app){   
    var router = express.Router();
    var controller = app.controllers.room;

    router.get('/resource/:id', controller.room);
    router.get('/resource', controller.getByAtribute);
    router.post('/resource', controller.newRoom);
    router.delete('/resource/:id', controller.remove);
    router.put('/resource/:id',controller.updateRoomAll);
    router.patch('/resource/:id',controller.updateRoom);

    app.use('/', router)
}