const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

const signupUser = async (req, res) => {
    try {
        // Verifique se o e-mail já está em uso
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já está em uso' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Crie um novo usuário com os dados fornecidos
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

        // Salve o novo usuário no banco de dados
        const savedUser = await newUser.save();

        // Retorne o usuário recém-criado como resposta
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserIdFromToken = (req, res) => {
  res.status(200).json({ userId: req.userId });
};

module.exports = { loginUser, signupUser, getUserIdFromToken  };
