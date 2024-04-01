const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Rota para buscar todos os anúncios
router.get('/product', async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para criar um novo anúncio
router.post('/product', async (req, res) => {
    const anuncio = new Product(req.body);
    try {
        const newProduct = await anuncio.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para buscar um anúncio específico
router.get('/product/:id', async (req, res) => {
    try {
        const anuncio = await Product.findById(req.params.id);
        if (!anuncio) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(anuncio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para atualizar um anúncio
router.put('/product/:id', async (req, res) => {
    try {
        const anuncio = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(anuncio);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para deletar um anúncio
router.delete('/product/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/product/:sellerCpf', async (req, res) => {
    try {
        const userProducts = await Product.find({ sellerCpf: req.params.sellerCpf });
        res.json(userProducts);
    } catch (error) {
        // Se ocorrer um erro, retorna uma mensagem de erro
        res.status(500).json({ message: 'Erro ao buscar os produtos do usuário' });
    }
});

module.exports = router;