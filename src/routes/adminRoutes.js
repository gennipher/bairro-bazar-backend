const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

// Rota para buscar todos os administradores
router.get('/admin', async (req, res) => {
    try {
        const admin = await Admin.find();
        res.json(admin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para criar um novo administrador
router.post('/admin', async (req, res) => {
    const admin = new Admin(req.body);
    try {
        const newAdmin = await admin.save();
        res.status(201).json(newAdmin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para buscar um administrador específico
router.get('/admin/:id', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Administrador não encontrado' });
        }
        res.json(admin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para atualizar um administrador
router.patch('/admin/:id', async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(admin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para deletar um administrador
router.delete('/admin/:id', async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);
        res.json({ message: 'Administrador deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;