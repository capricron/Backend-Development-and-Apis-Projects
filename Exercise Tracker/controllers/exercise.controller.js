const User = require("../models/user");

exports.createExercise = async (req, res) => {
    let {description,duration,date} = req.body;
    const {id} = req.params;

    try{

        date = (date) ? new Date(date) : new Date();

        User.findOneAndUpdate({
            _id: id
        },{
            $push: {
                log: {
                    description,
                    duration,
                    date : (date) ? new Date(date) : new Date()
                }
            }
        },{
        })
        .then(user => {
            res.json({
                _id: user._id,
                username: user.username,
                date: new Date(date).toDateString(),
                duration: parseInt(duration),
                description
            })
        })
        .catch(err => res.status(400).json('Error: ' + err))
    }catch(err){
        res.status(400).json('Error: ' + err)
    }
}

exports.logExercise = async (req,res) => {
    const {id} = req.params;
    let {from,to,limit} = req.query;

    console.log(from)

    try{
        User.findOne({
            _id: id
        })
        .then(user => {
            let log = user.log;
            let count = 0;
            let logs = [];

            if(from){
                from = new Date(from);
                log = log.filter(exercise => exercise.date >= from);
            }

            if(to){
                to = new Date(to);
                log = log.filter(exercise => exercise.date <= to);
            }

            if(limit){
                log = log.slice(0,limit);
            }

            log.forEach(exercise => {
                logs.push({
                    description: exercise.description,
                    duration: exercise.duration,
                    date: exercise.date.toDateString()
                })
            })

            res.json({
                _id: user._id,
                username: user.username,
                count: log.length,
                log: logs
            })
        })
        .catch(err => res.status(400).json('Error: ' + err))
    }catch(err){
        res.status(400).json('Error: ' + err)
    }
}