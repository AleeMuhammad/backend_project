import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import asyncHandler from './utils/asyncHandler.js';

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
})); //.use() is mostly used for configuration or middleware

app.use(express.json({limit:"16kb"})); //express can access the data coming in form of JSON 
app.use(express.urlencoded({extended:true,limit:'16kb'}));   //access data from the url (URL-encoded data)
app.use(express.static("public"))  //access the pdf,files,images
app.use(cookieParser())  //to access the user cookies and set the cookies(applying crud operations)

//routes
import userRoutes from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users",userRoutes) //http://localhost:8000/users/register


//http: donot encrypt the data 
//https: encrypt th data so that it should be secure.
//Url: uniform resource locator (address of the resource on the internet)
//URI: uniform resource identifier (unique identifier of the resource on the internet)
//URN: uniform resource name (name of the resource on the internet)

// http header contains/are the meta data . data coming along with the request and response (key value pair)
// headers are used fpr caching , authentication, state management.

// Request header -> from client to server
// Response header -> from server to client
// Representation header -> encoding/compression
// Payload header -> data

// Common HTTP headers
//Accept: application/json
// User-Agent : konsi application se request ayi hai ya browser se request ayi hai
//Authorization: bearer token
//Content-Type: application/json
//Cookie = key value pairs
//Cache -Control: no-cache, no-store, must-revalidate

//CORS

//HTTP Methods
//GET: to retrive data from the server
//HEAD: to retrive the headers from the server (no body)
//OpTIONS: to know the allowed methods for a resource
//TRACE: 
//DEETE: to delete a resource from the server
//POST: to create a resource on the server
//PUT: to update a resource on the server (replace the entire resource)
//PATCH: to update a resource on the server (replace only the specified fields) 





















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