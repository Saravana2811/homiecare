const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB connection URI is not defined in environment variables');
    }

    if (!process.env.MONGODB_URI.startsWith('mongodb://') && 
        !process.env.MONGODB_URI.startsWith('mongodb+srv://')) {
      throw new Error('Invalid MongoDB connection scheme. Must start with mongodb:// or mongodb+srv://');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Compass Connection String: ${process.env.MONGODB_URI}`);
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    // More detailed error logging
    if (err.name === 'MongoNetworkError') {
      console.error('🌐 Network error - is MongoDB running? Is the connection string correct?');
      console.error('💡 Try: mongodb://localhost:27017/serviceapp');
    } else if (err.name === 'MongooseServerSelectionError') {
      console.error('🔍 Server selection error - is the database available?');
    }
    throw err; // Re-throw to let server handle it
  }
};

module.exports = connectDB;