const { schema } = require('../../config/schemas/schemas')
const querystring = require('querystring');

module.exports = function(app){
    var Room = app.models.room;

    var controller = {

        findById: function(req,res){
            const id = req.params.id
            const response = Room.findById(id, function(err, data){
                if(err) console.log(err);
                else if(data) res.json(data);
                else res.sendStatus(404);
            })
        },

        getByAtributes: function(req,res){
            const atribute = req.params.atribute;
            Room.find(req.query, function(err, data){
                if(err) console.log(err);
                else if(data) res.json(data);
                else res.sendStatus(404);
            });
        },

        createRoom:function(req,res){
            const room = new Room(req.body);
            room.save(function(err,room){
                console.log(err);

                if(err) res.status(500).end();
                else res.json(room);
            });
        },

        replaceRoom: async function(req,res){
            let { error } = schema.validate(req.body)
            if (error) return res.status(400).send(error.details)
            
            const id = req.params.id;
            const query = req.body;
            const response = await Room.findOneAndUpdate({_id:id},query).exec();

            console.log(id);
            console.log(response);

            if(!response) res.sendStatus(404);
            else res.json("sucess");
        },

        updateRoom: async function(req,res){
            const id = req.params.id;
            const query = req.body;
            
            const response = await Room.findOneAndUpdate({_id:id},query).exec();
            
            console.log(id);
            console.log(response);

            if(!response) res.sendStatus(404);
            else res.json("sucess");
        },

        deleteRoom: async function(req,res){
            const id = req.params.id;

            let response = await Room.deleteOne({_id: id});
            
            console.log(id);
            console.log(response);

            if(response.n === 0) res.sendStatus(404);
            else res.json("sucess");
            
        }
    
    }

    return controller;
}