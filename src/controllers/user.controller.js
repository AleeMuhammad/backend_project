//controller is a function that receives request , process it and send response to the client

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadFile } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { text } from "express";

//Method 1 : no async handler + Api Response + Api Error
// const register = async(req,res) =>{
//    try {
//     res.status(200).json({
//         success:true,
//         message:"200 response successful"
//     })
//    } catch (error) {
//     res.status(500).json({
//         success:false,
//         message:`Error: ${error}`
//     })
//    }
// }

//Method 2 : with async handler(no need of try and catch) + Api Response + Api Error
const registerUser = asyncHandler(async (req, res) => {
  //get the details from frontend
  //validation- not empty
  //check if user already exits - username,email
  //check for images,check for avatar
  //upload them to cloudinary , avatar
  //create user object - create entry in db
  //remove pass and refresh token from response
  //check for user creation
  //return res

  const { username, email, fullname, password } = req.body;
  console.log("Email :", email);
  console.log("username :", username);

  //   if (!username?.trim() || !email?.trim() || !fullname?.trim() || !password?.trim()) {
  //     throw new ApiError(400, "All fields are required");
  //   }

  if (
    [username, email, fullname, password].some((field) => !field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

//   const existingUsernmae = User.findOne({username:username});

//   if (existingUsername) {
//     throw new ApiError(409, "username already exists");
//   }

  const existingUser =await User.findOne({
    $or: [{ username:username }, { email:email }],
  });

  if (existingUser) {
    throw new ApiError(409, "username or email already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
     throw new ApiError(400,"Avatar is required")
  }

  const avatar = await uploadFile(avatarLocalPath)
  const coverImage = await uploadFile(coverImageLocalPath)

  if(!avatar){
   throw new ApiError(400,"Avatar file is required")
  }

  const user = await User.create({
   username:username.toLowerCase(),
   email:email,
   fullname:fullname,
   password:password,
   avatar:avatar.url,
   coverImage: coverImage?.url || "",
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully"));

});

export default registerUser;
