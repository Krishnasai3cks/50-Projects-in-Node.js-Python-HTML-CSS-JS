/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DATABASE;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function (app, db) {

  app.route('/api/books')
    .get(function (req, res){
      
      db.collection('books').find({}).toArray((err,data) => {
        var a = data.map((d,i,arr) => {
          var obj = {
            _id: arr[i]._id,
            title: arr[i].title,
            commentcount: (arr[i].comments) ? arr[i].comments.length : 0
          }
          return obj;
        })
        return res.json(a);
      })
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
  
  
    .post(function (req, res){
      var title = req.body.title;
      var book = {title};
      !(title)? console.log('no title') : console.log()
      db.collection('books').insertOne(book,(err,doc)=>{
        return res.json(book);
      })
      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      db.collection('books').deleteMany({}, (err,doc) => {
        return (err)? res.send('unsuccessfull deletion'): res.send('complete delete successful')
        
      })
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      db.collection('books').find({_id: ObjectId(bookid)}).toArray((err, doc) => {
          expect(err, 'error').to.not.exist;
          doc.length === 0 ? res.send('book does not exists') : res.json(doc[0])
        });
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      
      (!bookid)? res.send('no bookid'): console.log();
      (!comment) ? res.send('no comments'): console.log() ;
      
      db.collection('books').findAndModify({_id: ObjectId(bookid)},{},{$push: {comments: comment}},(err,data)=>{
            (err) ? res.send('adding comment unsuccessful') : res.json(data.value);
      })
      //json res format same as .get
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
    db.collection('books').remove({_id: ObjectId(bookid)},(err,data)=>{
      if(err) return res.send(err)
      else{
         return res.send( 'delete successful');
      }
    })
      //if successful response will be 'delete successful'
    });
  
};
