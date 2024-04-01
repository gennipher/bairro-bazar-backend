const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

// Rota para buscar todos os usuários
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().maxTimeMS(30000);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para criar um novo usuário
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já está em uso' });
        }

        console.log("Senha a ser encriptada:", req.body.password);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log("Senha encriptada:", hashedPassword);

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            cpf: req.body.cpf,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            address: req.body.address,
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            uf: req.body.uf,
            cep: req.body.cep
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para buscar um usuário específico
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para atualizar um usuário
router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para deletar um usuário
router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;