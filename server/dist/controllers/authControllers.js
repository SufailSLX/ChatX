import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({ message: "User already exists" });
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id.toString())
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id.toString())
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
//# sourceMappingURL=authControllers.js.map