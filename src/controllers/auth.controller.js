import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
};

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const user = await User.create({ fullName, email, password, role });
    const token = generateToken(user.id);

    res.status(201).json({ user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user', details: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.json({ user: { id: user.id, fullName: user.fullName, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

export const getMe = async (req, res) => {
  res.json({ user: req.user });
};
