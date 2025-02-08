const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    Fullname: { type: String, required: true },
    adminStatus: { type: String, required: true, enum: ["Active", "Inactive"] },
    role: { type: String, enum: ["System administrator", "Administrator"], required: true },
    adminID: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }, // Add email field
    password: { type: String, required: true },
    phone: { type: String, required: true },
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;