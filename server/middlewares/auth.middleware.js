import userModel from '../models/user.model.js';
import { verifyUserToken } from '../utils/generateToken.js';
export const validateUser = async (req, res, next) => {
    try{

        const {userToken} = req.cookies;
        if(!userToken){
            return res.status(404).json({
                message: 'Token not found'
            })
        }
        
        
        const decoded = verifyUserToken(userToken)
        const userId = decoded.userId;
        const user = await userModel.findOne({_id: userId})
    if(!user){
        return res.status(404).json({
            message: "User not found with this token"
        })
    }
    
    req.user = user;
    
    next()
}catch(error){
    return res.status(400).json({
        message: `Found some error while verifying user --> ${error}`
    })
}
}
const authMiddleware = {validateUser}
export default authMiddleware