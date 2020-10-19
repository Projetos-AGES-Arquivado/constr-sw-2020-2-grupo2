var app = require('./config/express')();
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./docs/swagger.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// require('./config/database')('mongodb://localhost:27017/proj');

require('./config/database')('mongodb+srv://myuser:mypass@cluster0-xtv11.mongodb.net/test?retryWrites=true');

//require('./config/database')('mongodb+srv://dev:senhaMongo@cluster0.zjhca.mongodb.net/constSoftware?retryWrites=true&w=majority');

app.listen(app.get('port'), function(){
     console.log(`Express on port ${app.get('port')}`);
}); 