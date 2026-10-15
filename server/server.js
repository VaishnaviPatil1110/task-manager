import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

if (!uri || uri.includes("<password>") || uri.includes("YOUR_")) {
  console.error("\n[X] MONGO_URI is not set in server/.env");
  console.error("    Paste your MongoDB Atlas connection string there, then restart.\n");
  process.exit(1);
}

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log("[OK] MongoDB Atlas connected:", mongoose.connection.name);
} catch (err) {
  console.error("\n[X] MongoDB connection failed:", err.message);
  console.error("    Check: 1) password is correct (URL-encode special chars like @ as %40)");
  console.error("           2) Atlas > Network Access allows your IP (or 0.0.0.0/0)");
  console.error("           3) the connection string includes a database name\n");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`[OK] Server running on http://localhost:${PORT}`);
});
