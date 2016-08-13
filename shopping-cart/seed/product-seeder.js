var Product = require('../models/product');
var mongoose = require('mongoose');
var database = require('../config/db');

// Created function to run a seed into database and create one
function runSeed(req,res){

// Connects to my database on Mlab
  mongoose.connect(database.mongoUri(), function (err) {
    if(err) console.log("error");
    console.log("yeah! DB connected");
  });

// My products Array
  var products = [
    new Product({
    image: 'http://raoholdingsltd.com/files/Pro1%20(1).JPG',
    title: 'RAAO Slim Executive Wallet',
    description: 'Tired of bulky wallets when you hardly carry 10 note bills a few coins and more cards? Does your wallet give u a bummer?? Our wallet gurus have cut the bulky crap with their Slimplify approach. After several attempts our designers have successfully created a fully functional wallet without the bulk. The Pro series would suit anyone who believes in a premium slim wallet which provides enough space to stash 4 to 8 cards, a few notes and coins.',
    price: 35

    }),
    new Product({
    image: 'http://raoholdingsltd.com/files/Party%204.JPG',
    title: "RAAO Slim Minimalist's Wallet",
    description: "Introducing RAAO Slim Minimalist's bi-fold card wallet for individuals looking to reduce their pocket bulk. This beauty stashes 6 to 8 cards or could be used to store business cards and folded bills. The thin feature with slim yet sturdy premium leather is aesthetically very appealing.",
    price: 30

    }),
    new Product({
    image: 'http://raoholdingsltd.com/files/Sports%205.JPG',
    title: 'RAAO Slim card Wallet',
    description: 'Introducing the slimmest card holder ever! With less than half a centimetre thickness this  beauty would stash around 6 plastic cards / 20 business cards! You could also stash a few bills folded. Full grain leather, rich patina and excellent craftsmanship gives it a posh look.',
    price: 25

    }),
    new Product({
    image: 'http://raoholdingsltd.com/files/Travel%205.JPG',
    title: 'RAAO Slim Travellers Wallet',
    description: 'Calling all frequent flyers!! Tired of hanging a huge passport holder around your neck or shuffling through your bags looking for your passport? This pocket fit travellers wallet SLIMplifies your travel with a passport slot along with 8 cards to stash, a pen slot and two sleeves to organise your essential travel documents and bills.',
    price: 40

    })
  ];

// function that exits mongoose when reached the length of the product array
  var done = 0;
  for (var i=0; i<products.length; i++){

      products[i].save(function (err, res){
          done++;
          if(done === products.length){
              exit();
          }

      });
  }

  function exit() {
    mongoose.disconnect();
  }

}


module.exports ={
    runSeed
};
