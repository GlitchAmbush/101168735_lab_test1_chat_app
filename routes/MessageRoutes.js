const path = require('path');
const express = require('express');
const userModel = require('../models/User');
const groupModel = require('../models/GroupMessage');
const privateModel = require('../models/PrivateMessage');
const app = express();

app.use(express.json())

app.get('/', express.static(path.join(__dirname, '../public')))

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/register.html"))
})

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/chat.html"))
})

app.post("/api/register", async (req, res) => {
    console.log(req.body)

    const { username, firstname, lastname, password, creation } = req.body

    try {
        const user = await userModel.create({
            username,
            firstname,
            lastname,
            password,
            creation
        })
        console.log('User created successfully:', user)
    } catch (err) {
        if (err.code === 11000) {
            return res.json({ status: 'error' , error: 'Username already taken.'})
        }
        throw err
    }

    res.json({ status: 'ok'})
})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body
    const user = await userModel.findOne({username, password}).lean()

    if (!user) {
        return res.json({status: 'error', error: 'Invalid username/password'})
    }

    return res.json({ status: 'ok'})
})


app.post('/api/private_message', async (req, res) => {
    console.log(req.body)

    const { from_user, to_user, message, date_sent } = req.body

    try {
        const privateMessage = await privateModel.create({
            from_user,
            to_user,
            message,
            date_sent
        })
        console.log("Message sent successfully: ", privateMessage)
    } catch (err) {
        console.log(err)
    }

    res.json({ status: 'ok'})
})

module.exports = app;