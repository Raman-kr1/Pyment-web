import mongoose from 'mongoose';
export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    maxPoolSize: 20
  });
  console.log(`MongoDB connected: ${conn.connection.host}`);
};