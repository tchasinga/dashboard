import Aply from "../models/aply.model.js";

export const createAply = async (req, res) => {
    const { fullName, email, typeofservices, description, imageUrls } = req.body;
    try {
        const newAply = new Aply({ fullName, email, typeofservices, description, imageUrls });
        await newAply.save();
        res.status(201).json({
            success : true,
            message : 'Aply created successfully',
            data : newAply,
        });
    } catch (error) {
        res.status(409).json({
            success : false,
            message : 'Aply creation failed',
            error : error,
        });
    }
}