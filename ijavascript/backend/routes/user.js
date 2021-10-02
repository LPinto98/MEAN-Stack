const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");
const User = require('../models/user');

const router = express.Router();

router.post("/login", (req,res) => {
  User.findOne({ userid : req.body.userid }, ( error, user ) => {
    // console.log(user);
    if( !user ){
        res.status(401).json({
            success: false
        })
    }else{
        if(bcrypt.compareSync(req.body.password, user.password)){
            const token = jwt.sign({userid: user.userid, Id: user._id}, 'secret_this_should_be_longer', { expiresIn: '1h'});
            res.status(200).json({
              success: true,
              token: token,
              expiresIn: 3600,
              customerId: user.userid,
              isUserAuthenticated: true
            });
        } else{
            res.json({
                success: true,
                isUserAuthenticated: false
            })
        }
    }
})
});

router.get("", checkAuth, (req, res, next) => {
  return res.status(200).json({});
});

router.put("/last_login", checkAuth, (req, res)=>{
  const userid = req.userData.userid;
  User.findOne({ userid : userid }).then(user => {
    if(user){
      const newUser = new User({
        _id: user._id,
        name: user.name,
        userid: user.userid,
        password: user.password,
        last_login: req.body.last_login,
        balance: user.balance
      });
      User.updateOne({ userid: userid }, newUser).then(result => {
        res.status(200);
        console.log(result);
      });
    }
  })
})

module.exports = router;
