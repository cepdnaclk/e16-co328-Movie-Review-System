import jwt from "jsonwebtoken";
import { isJwtExpired } from "jwt-check-expiration";

const jwtSecret = `${process.env.JWT_SECRET}`;

const auth = async (req, res, next) => {

    if (!req.headers.authorization){
        return res.status(401).json({message: "Unauthorized, No token found"});
    }
    
    const token = req.headers.authorization.split(" ")[1];
    
    try {
        
        if (isJwtExpired(token)){
            return res.status(401).json({message: "Session expired. Please signin again"});
        }

        const decodepayload = jwt.verify(token, jwtSecret);
        req.userId = decodepayload?.id;

        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({message: "Unauthorized error"});
    }
}

export default auth;