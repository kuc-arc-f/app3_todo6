var express = require('express');
var router = express.Router();
var models = require("../models");

/******************************** 
* 
*********************************/
router.get('/', function(req, res, next) {
    res.send('respond with a resource-1234');
});
/******************************** 
* 
*********************************/
router.get('/index', function(req, res) {
    models.Todo.findAll({
        order: [
            ['id', 'DESC'],
        ],                    
    }).then((result) => {
        var items = result
        items.forEach( function (item) {
//                console.log( item.dataValues );
        });
        var param = {"result": result};
        res.json(param);
    });
});
/******************************** 
* 
*********************************/
router.post('/new', (req, res) => {
    var obj = req.body;
console.log(obj );
    models.Todo.create({
        title: obj.title,
        content: obj.content,
        complete : 0,
    })
    .then((result) => {
        res.json(req.body);
    }); 
});
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req, res) {
    models.Todo.findOne({
        where: {
            id: req.params.id,
        }
    })
    .then((result) => {
        console.log( result );
        var param = {"result": result};
        res.json(param);
    });    
    
});
/******************************** 
* update
*********************************/
router.post('/update', (req, res) => {
    var obj = req.body;
    models.Todo.update({
        title: obj.title,
        content: obj.content,
        complete: obj.complete,
    }, {
        where: {
            id: req.body.id
        },
        fields: [
            "title",
            "content",
            "complete"
        ]
    }).then(() => { 
        res.json(req.body);
    });    
});
/******************************** 
* delete
*********************************/
router.get('/delete/:id', function(req, res) {
    models.Todo.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => { 
        res.json( req.params.id);
    });
});
  

module.exports = router;
