import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { verifyToken } from "../utils/jwt";
import authService from "../api/services/auth.service";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;

  if (!token)
    return sendResponse(
      res,
      {
        message: "Token Not Found, Unauthorized Access Attempt",
        error: true,
      },
      401,
    );
  const payload = verifyToken(token, "access");
  //console.log(payload);

  if (!payload)
    return sendResponse(
      res,
      {
        message: "Invalid Access Token, Unauthorized Access Attempt",
        error: true,
      },
      401,
    );

  const user = await authService.getUserById(payload.id);

  if (!user)
    return sendResponse(
      res,
      {
        message: "User Doesn't Exist, Unauthorized Access Attempt",
        error: true,
      },
      401,
    );

  req.user = user; //express.d.ts --> global data type
  next();
};

// export const authorizeByRole = (...roles: Role[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!req.user) {
//       return res.send("Unauthorized");
//     }
//     if (!roles.includes(req.user.role)) {
//       res.send("You don't have permission");
//     }
//     next();
//   };
// };
