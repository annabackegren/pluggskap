import jwt from 'jsonwebtoken'

function verifyToken(req:any, res:any, next:any) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded:any = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.userId;
        return next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;