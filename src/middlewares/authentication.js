import jwt, { TokenExpiredError } from "jsonwebtoken";
import { AUTH_SECRET_KEY } from "../constant";
import { UserRepository } from "../models/user";

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.error("Unauthorized! Access Token was expired!", 401);
  }

  return res.error("Unauthorized!", 401);
}

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.error("Access Denied. No token provided.", 403);
  }

  jwt.verify(token, AUTH_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    const user = await UserRepository.findById(decoded.userId);
    req.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    next();
  });
};

export default verifyToken;