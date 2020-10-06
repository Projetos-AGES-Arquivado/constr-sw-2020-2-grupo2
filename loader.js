const server = require('./config/server')

require('./config/database')
require('./interface/routes')(server)
