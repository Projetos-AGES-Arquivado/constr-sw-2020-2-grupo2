const restful = require('node-restful');// expondo a api rest
const mongoose = restful.mongoose;

const itemSchema = new mongoose.Schema({
    numero: { type: Number, require: true},
    numeroPredio: { type: Number, require: true},
    lotacao: { type: Number, require: true},
    recursos: { type: String, required: true },
    presencial: { type: Boolean, required: true },
    url: { type: String, required: false },
    
});

module.exports = restful.model('Room', itemSchema);