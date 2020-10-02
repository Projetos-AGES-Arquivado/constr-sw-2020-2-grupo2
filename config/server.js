const port = 3000

// BODY parse os requisition
const bodyParser = require('body-parser'); // que faz o parse das requisições via formulário e “bodyParser.json” das requisições via json.
const express = require('express');
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(process.env.PORT || port, function () {
    console.log('Listening on');
})

module.exports = server