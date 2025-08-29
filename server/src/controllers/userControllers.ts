import { Request, Response} from "express"

export const getProfile = (req: any, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "User not found" });
  res.json(req.user);
};