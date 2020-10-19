const { schema } = require('../../config/schemas/schemas')
const querystring = require('querystring');

module.exports = function(app){
    var Room = app.models.room;

    var controller = {
        
        index: function(req,res){
            Room.find({},[],{sort: {number:1} }).exec().then((rooms) => {
                if(rooms) {
                    res.status(200).send(rooms)
                } else {
                    res.sendStatus(404)
                }
            })
            
        },

        findById: async function(req,res){
            const id = req.params.id;
            const response = await Room.findById(id).exec();
            if(response) {
                res.status(200).send(response)
            } else {
                res.sendStatus(404)
            }
        },

        findByAtributes: function(req,res){
            const atribute = req.params.atribute;
            const parse = req.query
            console.log(parse)
            res.sendStatus(200)
        },

        createRoom: function(req,res){
            const room = new Room(req.body);
            room.save(function(err,room){
                if(err)
                    res.status(500).end()
                else
                    res.status(201).send(room)
            });
        },

        updateRoom: function(req,res){
            const id = req.params.id;
            const query = req.body
            try{
                const response = Room.findOneAndUpdate({_id:id},query).exec()
            }catch{
                res.sendStatus(404)
            }
            console.log(id)
            console.log(response)
            res.status(204).json("sucess")
        },

        replaceRoom: function(req,res){
            let { error } = schema.validate(req.body)
            if (error) return res.status(400).send(error.details)
            const id = req.params.id;
            const query = req.body
            try{
                Room.findOneAndUpdate({_id:id},query).exec();
            }catch{
                res.sendStatus(404)
            }
            console.log(id)
            res.status(204).json("sucess")
        },

        deleteRoom: function(req,res){
            const id = req.params.id

            Room.deleteOne({_id: id}, function(err){
                if(!err)
                    res.status(204).json({message: 'sucess'})
                else
                    res.status(500).end()
            })
        }
    
    }

    return controller;
}