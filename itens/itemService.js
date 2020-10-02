const Item = require('./item');

//crud api
Item.methods(['get','post','pot','delete','pet']);

//return post/put method update
Item.updateOptions({new: true, runValidator: true})

module.exports = Item;