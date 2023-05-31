const express = require('express')
const router = express.Router()
const { User } = require('../Models/user.js');

    // checking the server
    router.get('/user',  (req, res) => {
    res.send("Hello Api")
    })
        
    router.get('/User', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
    })

    router.post('/User', async (req, res) => {
    const user = new User({
        name: req.body.name,
        user : req.body.user
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});





router.put('/:id', getUser, async (req, res) => {
    if (req.body.name != null ) {
        res.user.name = req.body.name
    }
    if (req.body.user != null ) {
        res.user.user = req.body.user
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
})


// Deleting one
router.delete('/:id', getUser, async (req, res) => {

    try {
        await res.user.deleteOne()
        res.json({ message : "Deleted User"})
    } catch (error) {
        res.status(500).json({ message : error.message})
    }
})

async function getUser(req, res, next) {
    let user

    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message : "Cannot find subscriber"})
        }
    } catch (error) {
        return res.status(500).json({ message : error.message})
    }

    res.user = user
    next()
}

module.exports = router