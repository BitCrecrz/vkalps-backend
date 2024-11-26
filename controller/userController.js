const UserSchema = require("../schema/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const signUpUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await UserSchema.findOne({ email })
        if (existingUser) return res.status(400).json({ message: 'email already exist', data: {} });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserSchema.create({ name, email, password: hashedPassword });
        return res.status(201).json({ message: 'user created', data: user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, 'vKaps');
        return res.status(200).json({ message: 'login successful', data: { ...token, ...user } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { loginUser, signUpUser }