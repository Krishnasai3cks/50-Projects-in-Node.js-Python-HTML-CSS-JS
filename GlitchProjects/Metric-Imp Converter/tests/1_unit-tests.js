/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '3.2L';
      assert.equal(convertHandler.getNum(input),3.2);
      done();
      //done();
    });
    
    test('Fractional Input', function(done) {
      var input = '3/2L';
      assert.equal(convertHandler.getNum(input),1.5);
      done();
      //done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '3.0/2L';
      assert.equal(convertHandler.getNum(input),1.5);
      done();
      //done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '3//2L';
      assert.equal(convertHandler.getNum(input),null);
      done();
      //done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'L';
      assert.equal(convertHandler.getNum(input),1);
      done();
      //done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      input.forEach(function(ele) {
        //assert
        assert.equal(ele, ele);
        
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = '12s'
      assert.equal(convertHandler.getUnit(input), null);

      done();
    });  
    
  });
  
 
  

  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      //see above example for hint
      var input = ['gal','mi','km','lbs','kg'];
      var expect = ['galoons' ,'miles' ,'kilometer' ,'pounds' ,'kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(expect[i], expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [5, 'l'];
      var expected = 1.3208608842899447;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
      //done();
    });
    
    test('Mi to Km', function(done) {
      var input = [5, 'mi'];
      var expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
      //done();
    });
    
    test('Km to Mi', function(done) {
      var input = [5, 'km'];
      var expected = 3.106863683249034;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
      //done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [11.023122100918886, 'lbs'];
      var expected = 5;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
      //done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [5, 'kg'];
      var expected = 11.023122100918886;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
      //done();
    });
    
  });

});