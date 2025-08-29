import jwt from "jsonwebtoken";
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
//# sourceMappingURL=jwt.js.map