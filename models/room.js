const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    number:{
        type: String,
        required: true
    },
    towerNumber: {
        type: String,
        required: true
    },
    resources: {
        type: Array,
        required: true
    },
    capacity: {
        type: Int32,
        requires: true
    },
    online: {
        type: Boolean,
        requires: true
    },
    url: {
        type: String,
        requires: true
    }
})

mongoose.model('Room', ProductSchema)