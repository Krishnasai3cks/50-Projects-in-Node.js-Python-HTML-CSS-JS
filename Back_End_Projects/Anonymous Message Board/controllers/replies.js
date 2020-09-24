let mongo = require("mongodb").MongoClient;
let obid = require("mongodb").ObjectID;
let url = process.env.DB;
function wrapper() {
  this.getlist = function(req, res) {
    let { board } = req.params;
    let { thread_id } = req.query;
    mongo.connect(url, (err, client) => {
      let db = client.db("Amsgbrd");
      let collection = db.collection(board);
      collection
        .find(
              {_id: new obid(thread_id)},
              {
                reported: 0,
                delete_password: 0,
                "replies.delete_password": 0,
                "replies.reported": 0
              }
        )
        .toArray((err,data)=>{
          if(err){
            console.log(err);
          }
          res.json(data[0])
        }
      )
      
    });
  };

  this.newreply = function(req, res) {
    let { board } = req.params;
    let { text, delete_password, thread_id } = req.body;
    let reply = {
      _id: new obid(),
      text,
      created_on: new Date(),
      delete_password,
      reported: false
    };
    mongo.connect(url, (err, client) => {
      let db = client.db("Amsgbrd");
      let collection = db.collection(board);
      collection.findAndModify(
        { _id: new obid(thread_id) },
        [],
        { $set: { bumped_on: new Date() }, $push: { replies: reply } },
        (err, docs) => {
          // docs.replies.push(reply);
          res.redirect(`/b/${board}/${thread_id}/`);
        }
      );
      //text, delete_password, & thread_id
    });
  };
  this.reportreply = function(req, res) {
    let { board } = req.params;
    let { thread_id, reply_id } = req.body;
    mongo.connect(url, (err, client) => {
      let db = client.db("Amsgbrd");
      let collection = db.collection(board);
      collection.findAndModify(
        {
          _id: new obid(thread_id),
          "replies._id": new obid(reply_id)
        },
        [],
        { $set: { "replies.$.reported": true } },
        (err, docs) => {}
      );
      res.send("reported");
    });
  };
  this.deletereply = function(req, res) {
    let { board } = req.params;
    let { thread_id, reply_id, delete_password } = req.body;

    mongo.connect(url, (err, client) => {
      let db = client.db("Amsgbrd");
      //thread_id, reply_id, & delete_password
      let collection = db.collection(board);
      collection.findAndModify(
        {
          _id: new obid(thread_id),
          //$elemMatch	Selects documents if element in the array field matches all the specified $elemMatch conditions.
          // we will need both the conditions to match in these so...
          replies: { $elemMatch: { _id: new obid(reply_id), delete_password } }
        },
        [],
        {
          $set: { "replies.$.text": "[deleted]" }
        },
        (err, doc) => {
          if (doc) {
            res.send("success");
          } else {
            res.send("incorrect password");
          }
        }
      );
    });
  };
}
module.exports = wrapper;
