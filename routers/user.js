const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middlewares/auth');
const bcrypt = require('bcryptjs');

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.cookie('authToken', token)
        res.send({user, token})
    } catch(e){
        res.send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})

        if(!user){
            return res.send({error: "User doesn't exist!"})
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if(!isMatch){
            return res.send({error: "Password is incorrect!"})
        }

        const token = await user.generateAuthToken()
        res.cookie('authToken', token)
        res.send({user, token})
    } catch(e){
        res.send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch(e){
        res.send(e)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

module.exports = router