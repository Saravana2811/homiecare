# MongoDB Compass Setup Guide

## 🗄️ **MongoDB Compass Connection**

### **Step 1: Install MongoDB Compass**
1. Download from: https://www.mongodb.com/try/download/compass
2. Install and open MongoDB Compass

### **Step 2: Connection String**
Use this connection string in Compass:
```
mongodb://localhost:27017/serviceapp
```

### **Step 3: Create .env file**
Create `backend/.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/serviceapp
JWT_SECRET=your_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
PORT=5000
```

### **Step 4: Start MongoDB**
**Option A: Local MongoDB**
1. Install MongoDB Community Server
2. Start MongoDB service
3. Run: `mongod` in terminal

**Option B: MongoDB Atlas (Cloud)**
1. Sign up at: https://www.mongodb.com/atlas
2. Create free cluster
3. Get connection string
4. Replace MONGODB_URI in .env

### **Step 5: Test Connection**
1. Start backend: `npm run dev`
2. Open Compass
3. Connect using: `mongodb://localhost:27017/serviceapp`
4. You should see the `serviceapp` database

### **Step 6: Database Collections**
After running the app, you'll see:
- `users` - User accounts
- `payments` - Payment records (if implemented)

## 🔧 **Troubleshooting**

**If connection fails:**
1. Check if MongoDB is running
2. Verify port 27017 is not blocked
3. Try: `mongodb://127.0.0.1:27017/serviceapp`

**If database doesn't exist:**
- It will be created automatically when first user registers

**For Windows:**
- Install MongoDB as a service
- Or run: `"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"` 