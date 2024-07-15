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


// this will be used to view all the aplys in our admin pages
export const getAply = async (req, res) => {
    try {
        const aplys = await Aply.find();
        res.status(200).json({
            success : true,
            message : 'Aplys fetched successfully',
            data : aplys,
        });
    } catch (error) {
        res.status(404).json({
            success : false,
            message : 'Aplys not found',
            error : error,
        });
    }
}

// this will used to be aplied in our admins pages to view the aply details
export const getAplyById = async (req, res) => {
    const { id } = req.params;
    try {
        const aply = await Aply.findById(id);
        res.status(200).json({
            success : true,
            message : 'Aply fetched by signle data successfully',
            data : aply,
        });
    } catch (error) {
        res.status(404).json({
            success : false,
            message : 'Aply not found',
            error : error,
        });
    }
}