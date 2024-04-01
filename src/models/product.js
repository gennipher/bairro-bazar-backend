const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sellerFirstName: {
        type: String,
        required: true
    },
    sellerLastName: {
        type: String,
        required: true
    },
    sellerCpf: {
        type: String,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    neighborhood: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;