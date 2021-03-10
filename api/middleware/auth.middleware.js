const jwt = require("jsonwebtoken");
const c = require('../config/constants')();

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ error: c.ERROR.PERMISSION_DENIED });

  try {
    const decoded = jwt.verify(token, c.app.JWT_KEY);
    req.user = decoded.user;
    next();
  } catch (e) {
    return res.status(500).send({ message: c.ERROR.INVALID_TOKEN });
  }
};