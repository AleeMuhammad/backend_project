import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import asyncHandler from './utils/asyncHandler';

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
})); //.use() is mostly used for configuration or middleware

app.use(express.json({limit:"16kb"})); //express can access the data coming in form of JSON 
app.use(express.urlencoded({extended:true,limit:'16kb'}));   //access data from the url (URL-encoded data)
app.use(express.static("public"))  //access the pdf,files,images
app.use(cookieParser())  //to access the user cookies and set the cookies(applying crud operations)


// app.get("/users",async(req,res)=>{
//   try {
    // res.json({
    //     data:users,
    //     message:"Users fetched successfully",
    // });
//   } catch (error) {
//   }
// }) // without using asyncHandler and ApiResponse and ApiError we have to write try and catch block in every route handler which is not a good practice and also we have to send the response in a specific format which is also not a good practice so we can use asyncHandler and ApiResponse and ApiError to handle all these things in a better way

// app.get('/users',asyncHandler(async(req,res)=>{
//    res.status(200).json(new ApiResponse(200,users,"Users fetched successfully"));
// })
// )  // with asyncHandler there is now no need of using try and catch again and again and also we can send the response in a specific format using ApiResponse and ApiError

export default app;


//express will be setup in app.js