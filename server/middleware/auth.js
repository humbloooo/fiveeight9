const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admin access deeply required.' });
    }
    next();
};

const requireStaff = (req, res, next) => {
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'staff')) {
        return res.status(403).json({ error: 'Forbidden: Staff access required.' });
    }
    next();
};

module.exports = { auth, requireAdmin, requireStaff };
