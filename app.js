require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const User = require('./models/userSchema');


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.4zxou.mongodb.net/${process.env.DB_TABLE_NAME}?retryWrites=true&w=majority`);
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))
app.set('view engine', 'ejs');



app.get('/signup', (req, res)=>{
    res.render('signup');
});
app.post('/signup', (req, res)=>{
    const email = req.body.input1;
    const password = req.body.input2;
    const user = new User({
        "email": email,
        "password": password
    });
    user.save().then(res.redirect('back'))
});
app.get('/signin', (req, res)=>{
    res.render('signin');
})

app.post('/signin', (req, res)=>{
    User.findOne({email: req.body.input1}, (err, result)=>{
        if(err){
            console.log("thee user name is not correct");
        } else {
            if(result){
                if (result.password === req.body.input2) {
                    res.send('done')
                } else {console.log('password is wrong');}
            }
        }
    })
})



app.listen(3000, ()=>{
    console.log('started listening on port 3000');
})