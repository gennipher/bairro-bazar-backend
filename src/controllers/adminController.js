const Admin = require('../models/admin');

// Função para buscar todos os administradores
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Função para criar um novo administrador
const createAdmin = async (req, res) => {
    const admin = new Admin(req.body);
    try {
        const newAdmin = await admin.save();
        res.status(201).json(newAdmin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Função para buscar um administrador específico pelo ID
const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Função para atualizar um administrador
const updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(admin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Função para deletar um administrador
const deleteAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);
        res.json({ message: 'Admin deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllAdmins, createAdmin, getAdminById, updateAdmin, deleteAdmin };