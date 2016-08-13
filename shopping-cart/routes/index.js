var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var seed = require('../seed/product-seeder');
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);
/* GET home page. */

router.get('/seed', function(req,res){

    seed.runSeed(req,res);

});

// function that renders exact amount of products in a particular row
router.get('/', function(req, res, next) {
    Product.find(function(err,docs){
        var productChunks = [];
        var chunkSize = 3 ;
        for (var i=0; i<docs.length; i+=chunkSize){
            productChunks.push(docs.slice(i, i+chunkSize));
        }
        res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
    });
});

router.get('/user/signup', function (req,res,next){

  res.render('user/signup', {csrfToken: req.csrfToken()})
});



module.exports = router;
