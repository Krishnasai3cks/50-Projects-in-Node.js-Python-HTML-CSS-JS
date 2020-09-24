/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
var expect = require("chai").expect;
var fetch = require("node-fetch");
// fetch: https://repeated-alpaca.glitch.me/v1/stock/GOOG/quote
async function getData(recievedSym) {
  var response = await fetch(
    `https://repeated-alpaca.glitch.me/v1/stock/${recievedSym}/quote`
  );
  var reqres = await response.json();
  const { symbol, latestPrice } = reqres;
  return { symbol, price: `${latestPrice}`};//this function returns the symbol and price from the api
}
var personalDB = {};


// var MongoClient = require("mongodb");
async function Thisistoreducecode(stock,like,){
  var { symbol, price } = await getData(stock);
      var responseToJson = {};
      if (symbol) {
        if (personalDB.hasOwnProperty(symbol)) {
          personalDB[symbol] = {symbol,price,like: like?personalDB[symbol].like+1:personalDB[symbol].like}
        } else {
          personalDB[symbol] = {
            symbol,price,like: like?1:0
          }
        }
      }
  return {
    stockData:{stock:symbol,price,likes: personalDB[symbol].like} //this function returns the stock data which we will eventually print
  }//this also added likes to our data.
}
function creator(a,b){
    return {
          stock: a.stockData.stock,
          price: a.stockData.price,
          rel_likes: a.stockData.likes-b.stockData.likes
    }
}
// const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
// {"stockData":{"stock":"GOOG","price":"786.90","likes":1}}
// {"stockData":[{"stock":"MSFT","price":"62.30","rel_likes":-1},{"stock":"GOOG","price":"786.90","rel_likes":1}]}
module.exports = function(app) {
  app.route("/api/stock-prices").get(async function(req, res) {
    //this block is to store unique ip addresses
    var ipdata = [];
    var decreaseornot = false;
    
    async function a() {
      var newip = await fetch('https://api.ipify.org/?format=json');
      var jsonres = await newip.json();
      var torn = ipdata.includes(jsonres.ip);
      if(torn){
        console.log("Am I even here")
        decreaseornot = true;
      } else {
        ipdata.push(jsonres.ip);
        console.log(torn)
      }
    }
    a();
    //
    var { stock, like } = req.query;
    if (typeof stock == "string") {
      var recieved = await Thisistoreducecode(stock,like);
      if(decreaseornot){
        recieved.stockData.likes -=1
      }
      res.json(recieved)
    } else {
      var recieved1 = await Thisistoreducecode(stock[0],like);
      var recieved2 = await Thisistoreducecode(stock[1],like);
      console.log(decreaseornot);
      if(decreaseornot){
        recieved1.stockData.likes -=1;
        recieved2.stockData.likes -=1;
      }
      var actualanswer = {
        stockData:[creator(recieved1,recieved2),creator(recieved2,recieved1)]
      };
      res.json(actualanswer)
    }
  });
};
