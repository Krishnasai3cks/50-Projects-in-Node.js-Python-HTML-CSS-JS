module.exports = function(app,db){
    app.get('/api/imagesearch/:query?offset=10',(req,res)=>{
        res.send("happy birthday");
    });
    app.get('/api/imagesearch',(req,res)=>{
        res.send('happy birthday to you ');
    });
}