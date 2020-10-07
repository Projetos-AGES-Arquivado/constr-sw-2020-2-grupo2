const port = 3000

// BODY parse os requisition
const bodyParser = require('body-parser'); // que faz o parse das requisições via formulário e “bodyParser.json” das requisições via json.
const express = require('express');
const server = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yml');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

var options = {
    explorer: true
};

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

server.listen(process.env.PORT || port, function () {
    console.log('Listening on');
})

module.exports = server