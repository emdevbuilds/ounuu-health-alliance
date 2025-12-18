import mongoose, { Schema, models, Document } from "mongoose";

export interface IDonation extends Document {
  fullName: string;
  email: string;
  phone?: string;
  amount: number;
  currency: string;
  donationType: "one-time" | "monthly";
  purpose?: string;
  message?: string;
  isAnonymous: boolean;
  paymentStatus: "pending" | "success" | "failed" | "abandoned";
  paystackReference?: string;
  paystackAccessCode?: string;
  transactionId?: string;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be at least 1"],
    },
    currency: {
      type: String,
      default: "NGN",
      enum: ["NGN", "USD"],
    },
    donationType: {
      type: String,
      enum: ["one-time", "monthly"],
      default: "one-time",
    },
    purpose: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, "Message is too long"],
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed", "abandoned"],
      default: "pending",
    },
    paystackReference: {
      type: String,
      sparse: true,
    },
    paystackAccessCode: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "donations",
  }
);

DonationSchema.index({ email: 1 });
DonationSchema.index({ createdAt: -1 });
DonationSchema.index({ paymentStatus: 1 });
DonationSchema.index({ paystackReference: 1 }, { unique: true, sparse: true });

export default models.Donation ||
  mongoose.model<IDonation>("Donation", DonationSchema);
