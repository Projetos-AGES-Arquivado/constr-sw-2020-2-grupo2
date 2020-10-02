const express = require('express');

module.exports = function(server) {

    //API Routes
    const router = express.Router()
    server.use('/api',router);

    //Registering API methods in route
    const intemService = require('../itens/itemService.js')
    intemService.register(router,'/item')
}