const { schema } = require('../../config/schemas/schemas')
const querystring = require('querystring');
const http = require('http');
const { exception } = require('console');
let classes = []
let aulas = []

function returnPromisse(result){
    classes.push(result)

}

function returnPromisseError(result){
    console.log('error')
}

async function buildClasses(room_classes){

    

    room_classes.forEach(element => {

        const url = `http://ec2-34-238-114-89.compute-1.amazonaws.com:3000/turma/${element}`
        const aux_class = new Promise((resolve) => { http.get(url, function (response) {
            response.setEncoding('utf8')
            let rawData = ''
            response.on('data', (chunk) => {
              rawData += chunk
            })
            response.on('end', () => {
              try {
                const parsedData = JSON.parse(rawData)
                resolve(parsedData)
              } catch (e) {
                resolve(element)
              }
            })
          })
        })

        classes.push(aux_class)
        //aux_class.then(returnPromisse,returnPromisseError)
        //classes.push(element)
    });

    return await Promise.all(classes)
}

async function fazAulas(sala_aulas){

    
try{
    sala_aulas.forEach(element => {

        const url = `http://admin:admin@ec2-18-218-177-125.us-east-2.compute.amazonaws.com:3000/api/v1/classes/${element}`
        const aux_class = new Promise((resolve) => { http.get(url, function (response) {
            response.setEncoding('utf8')
            let rawData = ''
            response.on('data', (chunk) => {
              rawData += chunk
            })
            response.on('end', () => {
              try {
                const parsedData = JSON.parse(rawData)
                resolve(parsedData)
              } catch (e) {
                resolve(element)
              }
            })
          })
        })

        aulas.push(aux_class)
        //aux_class.then(returnPromisse,returnPromisseError)
        //classes.push(element)
    });
  } catch {
    return null;
  }

    return await Promise.all(aulas)
}

module.exports = function(app){
    var Room = app.models.room;

    var controller = {

        findById: function(req,res){
            const id = req.params.id
          
            const response = Room.findById(id, async function(err, data){
                //grupo 6
                if (data == undefined) {
                  res.send("not found");
                  res.sendStatus(404);
          }
                const aux = await buildClasses(data._doc.turmas)
                data._doc.turmas = aux    
                //grupo 4
                const aux_aulas = await fazAulas(data._doc.aulas)
                data._doc.aulas = aux_aulas
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
                else{
                   res.json(room);
                   res.sendStatus(201);
                }
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