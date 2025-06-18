import * as jwt from "jsonwebtoken";

export interface Context {
  userId?: number;
}

export function authMiddleware(req: any): Context {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return {};
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { userId: number };
    return { userId: decoded.userId };
  } catch (err) {
    return {};
  }
}