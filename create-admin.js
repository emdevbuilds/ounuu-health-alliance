require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME = process.env.ADMIN_NAME || "Super Admin";

if (!MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI not found in environment variables");
  process.exit(1);
}

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: "super_admin" },
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

async function createSuperAdmin() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });

    if (existingAdmin) {
      console.log(`⚠️  Admin with email "${ADMIN_EMAIL}" already exists.`);
      console.log("🔄 Updating password...");

      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
      existingAdmin.password = hashedPassword;
      existingAdmin.name = ADMIN_NAME;
      existingAdmin.role = "super_admin";
      existingAdmin.isActive = true;
      await existingAdmin.save();

      console.log("✅ Super Admin password updated successfully!");
    } else {
      console.log("🔄 Creating new Super Admin...");

      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

      const newAdmin = new Admin({
        email: ADMIN_EMAIL,
        password: hashedPassword,
        name: ADMIN_NAME,
        role: "super_admin",
        isActive: true,
      });

      await newAdmin.save();
      console.log("✅ Super Admin created successfully!");
    }

    console.log("\n📧 Email:", ADMIN_EMAIL);
    console.log("🔑 Password:", ADMIN_PASSWORD);
    console.log("👤 Name:", ADMIN_NAME);
    console.log(
      "\n⚠️  IMPORTANT: Save these credentials securely and DO NOT commit them to GitHub!\n"
    );

    await mongoose.connection.close();
    console.log("✅ Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

createSuperAdmin();
