import mongoose from "mongoose";

export const connectDataBase = async () => {
  try {
    const connDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database is connected`);
  } catch (error) {
    console.error(`Error in Database`, error);
  }
};
