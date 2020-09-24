let mongo = require("mongodb").MongoClient;
let obid = require("mongodb").ObjectId;
let url = process.env.DB;

function wrapper() {
  this.getlist = function(req, res) {
    let { board } = req.params;
    mongo.connect(url, (err, client) => {
      let db = client.db("Amsgbrd");
      let collection = db.collection(board);
      // console.log(collection.find())
      collection
        .find(
          {},
          {
            reported: 0,
            delete_password: 0,
            "replies.delete_password": 0,
            "replies.reported": 0
          }
        )
        .sort({ bumped_on: -1 })
        .limit(10)
        .toArray((err, docs) => {
          docs.forEach(doc => {
            doc.replycount = doc.replies.length;
            
            if (doc.replycount > 3) {
              doc.replies = doc.replies.filter(a=> a.text !== '[deleted]').slice(-3);
              console.log(doc.replies);

            }
          });
          res.json(docs);
        });
    });
  };
  this.newthread = function(req, res) {
    let { board } = req.params;
    let { text, delete_password } = req.body;
    let thread = {
      //id will be automatically created,
      text,
      created_on: new Date(),
      bumped_on: new Date(),
      reported: false,
      delete_password,
      replies: []
    };
    mongo.connect(url, (err, client) => {
      let db = client.db("Amsgbrd");
      let collection = db.collection(board);
      collection.insert(thread, () => {
        res.redirect(`/b/${board}/`);
      });
    });

    //_id, text, created_on(date&time), bumped_on(date&time, starts same as created_on), reported(boolean), delete_password, & replies(array)
  };
  this.reportthread = function(req, res) {
    let { board } = req.params;
    let { report_id } = req.body;
    mongo.connect(url, (err, client) => {
      let db = client.db("Amsgbrd");
      let collection = db.collection(board);
      collection.findAndModify(
        { _id: new obid(report_id) },
        [],
        { $set: { reported: true } },
        (err, doc) => {
          if (err) {
            console.log(err);
          }
          res.send("reported");
        }
      );
    });
  };
  this.deletethread = function(req, res) {
    let { board } = req.params;
    let { thread_id, delete_password } = req.body;

    mongo.connect(url, (err, client) => {
      let db = client.db("Amsgbrd");
      let collection = db.collection(board);
      collection.findAndModify(
        { _id: new obid(thread_id), delete_password: delete_password },
        [],
        {},
        { remove: true, new: false },
        (err, doc) => {
          if (doc !== null) {
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
