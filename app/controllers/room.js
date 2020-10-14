module.exports = function(app){
    var Room = app.models.room;

    var controller = {
        index: function(req,res){
            Room.find({},[],{sort: {number:1} }).exec().then((rooms) => {
                res.send(rooms);
            })
            
        },
        newRoom:function(req,res){
            const room = new Room(req.body);
            room.save(function(err,room){
                console.log(err);

                if(err)
                    res.status(500).end();
                else
                    res.json(room);
            });
        },
        remove: function(req,res){
            const id = req.params.id;

            Room.deleteOne({_id: id}, function(err){
            if(!err)
                res.json({message: 'sucess'});
            else
                res.status(500).end();
            })
        },
        room: async function(req,res){
            const id = req.params.id;
            const response = await Room.findById(id).exec();
            console.log(id)
            console.log(response)
            res.json(response)
        }        
    }

    return controller;
}