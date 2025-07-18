
const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor");
const dotEnv = require("dotenv")

dotEnv.config()

const secretKey = process.env.SECRET_CODE


const verifyToken = async(req, res, next) => {
    const token = req.headers.token;
    
    if(!token) {
        return res.status(401).json({error: "Token is required"})
    }

    try {
        const decoded = jwt.verify(token, secretKey)     
        const vendor = await Vendor.findById(decoded.vendorId) 

        if(!vendor) {
            return res.status(404).json({error : "Vendor not found"})
        }

        req.vendorId = vendor._id;
        next()

    } catch (error) {
        console.log(`There is an error : ${error}`) 
        return res.status(500).json({error : "Invalid token error"})
    }
}


module.exports = verifyToken