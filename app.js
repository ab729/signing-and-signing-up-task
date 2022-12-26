require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const User = require('./models/userSchema');
const bcrypt = require('bcrypt');
const saltRound = 12;


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
    bcrypt.hash(password, saltRound, (err, hash)=>{
        const user = new User({
            "email": email,
            "password": hash
        });
        user.save().then(res.redirect('back'));
    });
    
});
app.get('/signin', (req, res)=>{
    res.render('signin');
})

app.post('/signin', (req, res)=>{
    User.findOne({email: req.body.input1}, (err, result)=>{
        if(err){
            console.log("the user name is not correct");
        } else {
            if(result){
                bcrypt.compare(req.body.input2, result.password, (err, checkState)=>{
                    if(checkState === true){
                        res.send('you are registred');
                    } else { console.log('error');}
                })
            }
        }
    })
})



app.listen(3000, ()=>{
    console.log('started listening on port 3000');
})