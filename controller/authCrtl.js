import {
  registerService,
  loginService,
  loginAdminService,
  generatePasswordLink,
  verifyUrlService,
  resetPasswordService
} from '../service/authService.js';

export const register = async (req, res) => {
  try {
    const newUser = await registerService(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const userCredentials = { email: req.body.email, password: req.body.password };
    const user = await loginService(userCredentials);
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: "Invalid Email or Password" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const adminCredentials = { email: req.body.email, password: req.body.password };
    const admin = await loginAdminService(adminCredentials);
    res.status(200).json(admin);
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: "Invalid Admin User" });
  }
};

export const passwordLink = async (req, res) => {
  try {
    const { email } = req.body;
    const message = await generatePasswordLink(email);

    res.status(200).send({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyUrl = async (req, res) => {
  try {
    const { id, token } = req.params;
    const message = await verifyUrlService(id, token);

    res.status(200).send({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    const message = await resetPasswordService(id, token, password);

    res.status(200).send({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
