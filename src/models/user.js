const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    neighborhood: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;