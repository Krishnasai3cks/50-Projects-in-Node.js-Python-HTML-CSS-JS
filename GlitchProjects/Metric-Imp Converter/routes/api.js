/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      var result;
      console.log(initNum+"  "+initUnit+"  "+returnNum+"  "+returnUnit);
      if(initUnit == null && initNum == null){
        result ={ error: "invalid unit and number"}
      } else if (initUnit == null) {
        result = {
          error: "invalid unit"
        };
      } else if (initNum == null) {
        result = {
          error: "invalid number"
         }
      } else {
        result = {
          initNum,
          initUnit,
          returnNum,
          returnUnit,
          string: toString
        };
      }
    
      res.json(result);
      //res.json
    });
    
};
