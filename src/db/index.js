import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(
      `Mongo DB connected, DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGO_DB connection error ", error);
    process.exit(1);
  }
};

export default connectDB;