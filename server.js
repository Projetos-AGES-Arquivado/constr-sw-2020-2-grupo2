
const express = require('express');
const bodyParser = require('body-parser');
const Db = require('mongodb/lib/db');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const Room = mongoose.model('Room')

const app = express();
const uriMongo = 'mongodb+srv://dev:senhaMongo@cluster0.zjhca.mongodb.net/constSoftware?retryWrites=true&w=majority'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


MongoClient.connect(uriMongo, (err, client) => {
    if (err) return console.log(err)
    db = client.db('consSoftware')

    app.listen(3000, function() {
        console.log('Server is running on port 3000')
    })
});

// habilitando que a api se conecte ao browser


// routes
app.get('/',(req,res) => {
    res.send('merda')
});


app.get('/getAllRooms',(req,res) => {
    db.collection('room').find().toArray((err, results) => {
        if (err){
            res,sendStatus(400);
            return console.log(err);
        }

        res.send(results);
        res.sendStatus(200);
        console.log('Dados carregados')
    });
});

app.get('/getRoom/:id', (req,res) => {
    try{
        const id = req.params.id;
        const roomFound = Room.findById(id);
        res.sendStatus(200);
        res.json(roomFound);

    }catch{
        res.sendStatus(404);
        res.send('None shall pass');
    }
}) 

app.put('room/:id', (req,res) => {
    const id = req.params.id;
    const query = req.body;

    try {
        const roomFound = Room.findAndUpdate(id, query, { new: true })
        res.status(200);
        return res.json(roomFound)
    }
    catch {
        res.status(404);
        res.send('None shall pass');
    }
})

app.patch('/room/:id', (req,res) => {

    const id = req.params.id;
    const query = req.body;

    try {
        const roomFound = Room.findAndUpdate(id, query, { new: true })
        res.status(200);
        return res.json(roomFound)
    }
    catch {
        res.status(404);
        res.send('None shall pass');
    }


})

app.post('/newRoom',(req,res) => {
    db.collection('room').insertOne(req.body, (err, client) => {
        if (err){
            res,sendStatus(400);
            return console.log(err);
        }

        console.log('Salvo no banco');
        res.sendStatus(200);
    })

});

app.delete('/room/:id', (req,res) => {
    const id = req.params.id;

    try {
        const roomFound = Room.findByIdAndRemove(id, query, { new: true })
        res.status(200);
        return res.json(roomFound)
    }
    catch {
        res.status(404);
        res.send('None shall pass');
    }

})

// implementar o update