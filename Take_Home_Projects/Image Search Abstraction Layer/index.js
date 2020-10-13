
const express = require('express');
const routes = require('./routes/routes.js');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const dotenv = require('dotenv');
app.get('/',(req,res)=>{
    res.sendFile(process.cwd()+'/views/index.html');
});

MongoClient.connect(process.env.DATABASE,{useUnifiedTopology: true},(err,client)=>{
    var db = client.db('ImageSearch');
    (db)? console.log("success"): console.log("failure");
    routes(app,db);
})
app.listen(3000, () => {
  console.log('server started');
});