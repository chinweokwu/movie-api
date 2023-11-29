import  UserModel from '../model/userModel.js';
import  jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      return res.status(401).json({ message: 'No token attached to the header' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded?.id);

    if (!user) {
      return res.status(401).json({ message: 'Not authorized, please login again' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const adminAuthMiddleware = async (req, res, next) => {
  try {
    const { email } = req.user;
    const adminUser = await UserModel.findOne({ email });

    if (adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Not an authorized admin' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const extractTokenFromHeader = (authorizationHeader) => {
  if (authorizationHeader?.startsWith('Bearer')) {
    return authorizationHeader.split(' ')[1];
  }
  return null;
};
