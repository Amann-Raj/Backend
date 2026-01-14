import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        // process.env se humne .env file ka data access kiya
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);  // Error aane par app stop kar do
    }
};

export default connectDB;