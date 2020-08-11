const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidation,loginValidation} = require('../validation')



//register
router.post('/register',async (req,res) => {

    //validate req.body
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    //Cheling if user in DB
    const emailExist = await User.findOne({email:req.body.email})
    if( emailExist ) return res.status(400).send('Email Already exist')

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)


    //Create User
    const user = new User ({
        name:req.body.name,
        password:hashedPassword,
        email:req.body.email
    })

    //User debugging
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (err){
        res.status(400).send(err)
    }
})

//Login
router.post('/login',async (req,res) => {

    //validate req.body
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    //Cheling if email exist
    const user = await User.findOne({email:req.body.email})
    if( !user ) return res.status(400).send('Email doesn\'t exist')

    //Password correct
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send('Invalid password')

    //Create & asignd token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token)



    res.send('Logged in !')
})







module.exports = router