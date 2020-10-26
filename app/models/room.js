var mongoose = require('mongoose');

module.exports = function(){
    var schema = mongoose.Schema({
        number: {
            type: String,
            required: true,
            
        },
        towerNumber: {
            type: String,
            required: true,
            
        },
        capacity: {
            type: Number,
            required: true,
        },
        resources: {
            type: Array,
            required: true,
        }, 
        online:{
            type: Boolean,
            required: true
        },
        url: {
            type: String,
            required: false,
        },
        turmas: {
            type: Array,
        }
    });

    return mongoose.model('Room', schema, 'rooms');
}