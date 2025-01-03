import bcrypt from "bcrypt";
import { createUser, findUserByEmail, getAllUsers } from "../models/user.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    console.log(existingUser);

    if (existingUser) {
      return res.status(400).json(new ApiError(401, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = 0;
    const userId = await createUser({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json(new ApiResponse(200, userId, "Registration success"));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error registering user"));
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json(new ApiError(400, "User does not exit, Register please"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(new ApiError(401, "Invalid password"));
    }

    if (user.role === 1) {
      return res
        .status(200)
        .json(new ApiResponse(200, "Admin Login successful"));
    }
    console.log(req);

    return res.status(200).json(new ApiResponse(200, "Login successful"));
  } catch (error) {
    res.status(500).json(new ApiError(501, "Error logging in"));
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    if (!users || users.length === 0) {
      return res.status(200).json(new ApiResponse(201, users, "No users yet!"));
    }

    return res
      .status(201)
      .json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Could not get users");
  }
};
