var fetchJSON = require('fetch-json');
var nodeFetch = require('node-fetch')
module.exports = function(app, db) {
  app.get("/api/imagesearch/:name", (req, res) => {
    var offset = req.query.offset ? req.query.offset : 10;
    var imageName = req.params.name;
    var date = new Date().toISOString();
    var testPrint = {
      term: imageName,
      when: date
    };
    var url = `https://cryptic-ridge-9197.herokuapp.com/api/imagesearch/${imageName}?offset=${offset}`;
    fetchJSON.get(url).then((data)=>{
      db.collection("ImageSearch").insertOne(testPrint, (err, doc) => {
        if (err) console.log(err);
        else res.json(data);
      });
      
    })
  });
  app.get("/api/imagesearch", (req, res) => {
    db.collection("ImageSearch").find({}).toArray((err,data)=>{
      if(err) console.log(err);
      else{
        res.json(data);
      }
    });
  });
};
