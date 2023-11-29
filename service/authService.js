import UserModel from "../model/userModel.js";
import Token from "../model/emailToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

export const registerService = async ({ username, email, password }) => {
  const existingUser = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error("User with given email or username already exists");
  }

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await new UserModel({
    username,
    email,
    password: hashPassword,
  }).save();

  const { password: _, ...userInfo } = newUser.toObject();

  return userInfo;
};

export const loginService = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  console.log(user);
  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid Email or Password");
  }

  const accessToken = jwt.sign(
    { email: user.email, id: user._id },
    process.env.SECRET_KEY,
    { expiresIn: "5d" }
  );
  const { password: _, ...userInfo } = user.toObject();

  return { accessToken, ...userInfo };
};

export const loginAdminService = async ({ email, password }) => {
  const admin = await UserModel.findOne({ email });

  if (!admin || admin.role !== "admin") {
    throw new Error("You are not a vaild admin");
  }

  const validPassword = await bcrypt.compare(password, admin.password);

  if (!validPassword) {
    throw new Error("You are not a valid admin");
  }

  const accessToken = jwt.sign(
    { email: admin.email, id: admin._id },
    process.env.SECRET_KEY,
    { expiresIn: "5d" }
  );
  const { password: _, ...adminInfo } = admin.toObject();

  return { accessToken, ...adminInfo };
};

export const generatePasswordLink = async (email) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("User with email does not exist");
  }

  let token = await Token.findOne({ userId: user._id });

  if (!token) {
    token = await new Token({
      userId: user._id,
      token: jwt.sign(
        { email: user.email, _id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      ),
    }).save();
  }

  const url = `http://localhost:8080/reset-password/${user.id}/${token.token}`;
  const subject = "Password Reset";
  const message = `
    <p>Here is a link to reset your password. </p>
    <p>Click this link <a href="${url}">here</a> to reset your password</p>
  `;

  await sendEmail(user.email, subject, message);

  return "Password reset link is sent to your email account";
};

export const verifyUrlService = async (userId, token) => {
  try {
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new Error("Invalid link");
    }

    const tokenData = await Token.findOne({
      userId: user._id,
      token,
    });

    if (!tokenData) {
      throw new Error("Invalid link");
    }

    return "Valid URL";
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

export const resetPasswordService = async (userId, token, newPassword) => {
  try {
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new Error("Invalid link");
    }

    const tokenData = await Token.findOne({
      userId: user._id,
      token,
    });

    if (!tokenData) {
      throw new Error("Invalid link");
    }

    if (!user.verified) {
      user.verified = true;
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { password: hashPassword } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Failed to update user password");
    }
    await tokenData.deleteOne();
    return "Password successfully reset";
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};
