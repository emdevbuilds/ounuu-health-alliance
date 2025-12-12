import mongoose, { Schema, models, Document } from "mongoose";

export interface IPartnership extends Document {
  organizationName: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  organizationType: string;
  areaOfInterest: string;
  message: string;
  status: "new" | "read" | "responded";
  createdAt: Date;
  updatedAt: Date;
}

const PartnershipSchema = new Schema<IPartnership>(
  {
    organizationName: {
      type: String,
      required: [true, "Organization name is required"],
      trim: true,
      minlength: [2, "Organization name must be at least 2 characters"],
    },
    contactPerson: {
      type: String,
      required: [true, "Contact person name is required"],
      trim: true,
      minlength: [2, "Contact person name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      minlength: [4, "Phone number must be at least 4 digits"],
      maxlength: [16, "Phone number is too long"],
    },
    organizationType: {
      type: String,
      required: [true, "Please select an Organization type"],
    },
    areaOfInterest: {
      type: String,
      required: [true, "Please select an Area of Interest"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [10, "Message must be at least 10 characters"],
    },
    status: {
      type: String,
      enum: ["new", "read", "responded"],
      default: "new",
    },
  },
  {
    timestamps: true,
    collection: "partnership",
  }
);

PartnershipSchema.index({ email: 1 });
PartnershipSchema.index({ createdAt: -1 });
PartnershipSchema.index({ status: 1 });

export default models.Partnership ||
  mongoose.model<IPartnership>("Partnership", PartnershipSchema);
