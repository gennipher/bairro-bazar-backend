const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, 'secreto', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.userId = decodedToken.userId;
    next();
  });
};

module.exports = { requireAuth };
