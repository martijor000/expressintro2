const { Console } = require('console');
var express = require('express');
var router = express.Router();
var fs = require('fs');
const { devNull } = require('os');
const { stringify } = require('querystring');

//Endpoints/Routes ----------------------------------------------------------


//CRUD - Create, Read, Update, Delete

// Create a resource - Create
router.post('/', function(req, res){
    try{
        console.log("Posted Object is: ", req.body);
        const rawdata = fs.readFileSync('channels.json');
        var channelData = JSON.parse(rawdata);
        var rawBody = req.body;
        var newObject = {
            channel: null,
            name: null
        }

        if(rawBody.channel != null)
        {
            newObject.channel = rawBody.channel;
        }

        if(rawBody.name != null)
        {
            newObject.name = rawBody.name;
        }

        newObject.id = channelData.length;

        channelData.push(newObject);
        const data = fs.writeFileSync('channels.json', JSON.stringify(channelData));    
        res.status(200).json(channelData);

    }catch(err){
        res.status(500).json({message: err.message});
    }
});

//get all of a resource - Read
router.get('/', function(req, res){
    try
    {
        var rawdata =fs.readFileSync('channels.json'); // <Buffer  <hex code> - Raw Data
        var channelData = JSON.parse(rawdata);
        console.log(channelData);
        res.status(200).json(channelData);
    } catch(err)
    {
        res.status(500).json({message: err.message});
    }
});



//Updated a resource - Update
router.patch('/', function(req,res){
    try{
        console.log("Posted Object is: ",req.params.id, req.body);
        const rawdata = fs.readFileSync('channels.json');
        var channelData = JSON.parse(rawdata);

        var rawBody = req.body;

        var newObject = {
            channel: null,
            name: null
        }

        if(rawBody.channel != null)
        {
            newObject.channel = rawBody.channel;
        }

        if(rawBody.name != null)
        {
            newObject.name = rawBody.name;
        }

        newObject.id = channelData.length;

        channelData.push(newObject);

        
        const data = fs.writeFileSync('channels.json', JSON.stringify(channelData));    
        res.status(200).json(channelData);

    }catch(err){
        res.status(500).json({message: err.message});
    }

})

//delete a resource - Delete
router.delete('/', function(req, res){
    res.status(200).json({message: "deleted the resource"})
})

module.exports = router;