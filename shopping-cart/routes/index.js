var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var seed = require('../seed/product-seeder');
var csrf = require('csurf');
var passport = require('passport')

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
    var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0})
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/user/profile', function(req,res,next){
  res.render('user/profile')
});

module.exports = router;
