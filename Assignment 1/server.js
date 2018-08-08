
const express =require('express');
const bodyParser = require('body-parser');
const routes =require('./routes/api')
const mongoose =require('mongoose');
const path =require('path');

const app =express();



//connect db

mongoose.connect('mongodb://localhost/approval-system');
mongoose.Promise=global.Promise;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api',routes);

//load view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')




 //Error handlign middleware

app.use(function(err,req,res,next){

   // res.status(422).send({error: err.message});
    res.status(422).send({error: err.message});
});

app.get('/',function(req,res){
    res.render('index');
});

port =process.env.port || 3500;
app.listen(port,function(){

    console.log(`listing on port ${port}`);
})