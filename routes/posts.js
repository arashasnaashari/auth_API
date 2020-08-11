const router = require('express').Router()
const verify = require('./verifytoken')
const User = require('../model/User')

router.get('/',verify,(req,res) => {
    res.json({
        posts:{
            title:'first posts',
            desc:'ramdom data uoy sholudnt access'
        }
    })
    // res.send(req.user)
    // User.findOne({_id:req.user})
})


module.exports = router