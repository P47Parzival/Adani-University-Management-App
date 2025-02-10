const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
    Fullname: {type: String, required: true},
    professorStatus: {type: String, required: true},
    department: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    professorID: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
})

const Professor = mongoose.model("Professor", professorSchema);
module.exports = Professor;
