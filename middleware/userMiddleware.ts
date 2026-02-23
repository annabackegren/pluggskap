import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import type {JwtPayload} from 'jsonwebtoken'

interface AuthRequest extends Request{
    userId?: number
}

interface TokenPayload extends JwtPayload{
    userId: number
}

function verifyToken(req:AuthRequest, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, 'your-secret-key') as TokenPayload;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default verifyToken;