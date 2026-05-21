import config from "../config";
import { IUser } from "../middleware/users/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";

export const signToken = (payload: IUser & { id: number }) => {
  
   //accessToken ==> data access
  // refreshToken ==> regenerate access token

  const accessToken = jwt.sign(payload, config.jwt_secret, { expiresIn: "7d" });

  const refreshToken = jwt.sign(payload, config.ref_secret, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret = type === "access" ? config.jwt_secret : config.ref_secret;
  const decoded = jwt.verify(token, secret);
  return decoded as JwtPayload;
};
