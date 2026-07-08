import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateUserToken } from "../utils/generateToken.js";


const logout  =  async (req, res) => {
    const user = req.user;
    console.log(user)
    if(!user){
        return res.status(404).json({
            message: "User not found while verifying"
        })
    }
    console.log(user)

    res.clearCookie("userToken")

    return res.status(200).json({
        message: "user logged out successfully"
    })
}


const googleAtuh = async (req, res) => {
  const {name, email, avatar} = req.body;

  if(!name || !email || !avatar){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    console.log(name, email, avatar)
    
    
    try {

      // if (!validetor.isEmail(email)) {
      //   return res.status(400).json({
      //     message: "Enter a valid Email",
      //   });
      // }
      let user = await userModel.findOne({ email });
console.log('working', user)
    if (!user) {
console.log('working')
      user = await userModel.create({
        name, email, avatar: avatar
      })
      console.log('working', user)
    }
    console.log(user)

    const userToken = generateUserToken(user._id);

    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User logged in succesfully with Google",
      data: user
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: `Some error while getting user form google --> ${error}`,
    });
}
  
}


const authController = {googleAtuh, logout}
export default authController
