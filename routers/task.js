const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middlewares/auth');

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        creator: req.user._id
    })
    try{
        await task.save()
        res.send(task)
    } catch(e){
        res.send(e)
    }
})

router.get('/tasks', auth, async (req, res) => {
    try{
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch(e){
        res.send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try{
        const task = await Task.findOne({ _id: req.params.id, creator: req.user._id})

        if(!task){
            return res.status(400).send()
        }

        updates.forEach(update => task[update] = req.body[update])

        await task.save()
        res.send(task)
    } catch(e){
        res.send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, creator: req.user._id})

        if(!task){
            return res.send({error: "Task not found!"})
        }

        res.send(task)
    } catch(e){
        res.send()
    }
})

module.exports = router