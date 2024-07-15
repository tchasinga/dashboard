import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Adding a singup for user to the app...
export const singup = async (req, res, next) =>{
    try {
        const {username, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        const result = await newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully ...???",
            data: result,
        })
    } catch (error) {
        next(error);
        res.status(400).json({
            success: false,
            message: "Failed to create a user in your system",
            data: result,
        })
    }
}