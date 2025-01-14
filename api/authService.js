const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY || "aizdoazndnefiejzaioeufanefbeuif"; // A CHANGER


function generateToken(user) {
  const payload = { userId: user.id, username: user.username, email: user.email, isAdmin: user.is_admin }; // jwt a resigned so no possibility to change is_admin: will be used for react interface change
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}



function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
//   console.log(authHeader, token)
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { generateToken, authenticateToken };
