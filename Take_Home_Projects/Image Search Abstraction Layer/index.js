require('dotenv').config();
const express = require('express');
const routes = require('./routes/routes.js');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.get('/',(req,res)=>{
    res.sendFile(process.cwd()+'/views/index.html');
});

MongoClient.connect(process.env.DATABASE,{ useUnifiedTopology: true },(err,client)=>{
    if(err) console.log(err);
    var db = client.db('ImageSearch');
    (db)? console.log("success"): console.log("failure");
    routes(app,db);
})
app.listen(3000, () => {
  console.log('server started');
});
