
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Exercise = new Schema (
    {
        description: String,
        duration: Number,
        date: Date
    },
    {
        _id: false
    }
);

const userSchema = new Schema({
    username: String,
    log: [
        Exercise
    ]
})

const Person = mongoose.model("user", userSchema);

const saveUser = async () => {
  try {
    const user = new Person({
      username: 'testing',
    });

    const data = await user.save();
    console.log(data); // Dokumen person yang baru dibuat
  } catch (err) {
    console.error(err);
  }
};

saveUser();

module.exports = Person;