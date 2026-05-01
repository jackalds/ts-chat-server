import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '../config/config.js';
import type { NextFunction, Request, Response } from 'express';

const { JWT_SECRET } = config;

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token, authorization denied' });

  const token = authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    // Verify and decode token
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as CustomRequest).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth;
