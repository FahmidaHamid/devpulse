import { Request, Response } from "express";
import authService from "../services/auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { signToken } from "../../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  const user = await authService.createUser(req.body);
  if (!user) {
    return sendResponse(res, { message: "Failed to Create User" }, 404);
  }

  return sendResponse(
    res,
    { message: "User Registered Successfully", data: user, error: false },
    201,
  );
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.validateUser(email, password);
  if (!user)
    return sendResponse(
      res,
      { message: "Invalid Email or Password", error: true },
      401,
    );
  const { accessToken } = signToken(user);

  return sendResponse(
    res,
    {
      message: "Login Successful",
      data: { token: accessToken, user },
      error: false,
    },
    200,
  );
};
