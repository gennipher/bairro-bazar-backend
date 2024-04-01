const express = require('express');
const app = express();
const mongoose  =  require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/authRoutes');
require("dotenv").config();
const cors = require('cors');

const uri = process.env.MONGODB_URI

const options = {
};

mongoose.connect(uri, options)
  .then(() => console.log("Conectado ao MongoDB Atlas"))
  .catch(error => console.error("Erro ao conectar ao MongoDB Atlas:", error));

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', productRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
