const User = require("../models/user");

exports.createUser = async (req, res) => {

    const {username} = req.body;

    User.findOne({
        username
    }).then(user => {
        (user) ? res.json({
            username: user.username,
            _id: user._id
        }) : 
        new User({
            username
        }).save()
        .then(user => res.json({
            username: user.username,
            _id: user._id
        })).catch(err => res.status(400).json('Error: ' + err))
    }).catch(err => res.status(400).json('Error: ' + err))
}

exports.allUsers = async (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))  
}
