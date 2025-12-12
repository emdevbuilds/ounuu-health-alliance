import mongoose, { Schema, models, Document } from "mongoose";

export interface IVolunteer extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
  areaOfInterest: string;
  skillAndExperience: string;
  motivation: string;
  status: "new" | "read" | "responded";
  createdAt: Date;
  updatedAt: Date;
}

const VolunteerSchema = new Schema<IVolunteer>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
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
    gender: {
      type: String,
      required: [true, "Please select your gender"],
    },
    address: {
      type: String,
      required: [true, "Please enter your address"],
      trim: true,
      minlength: [2, "Address must be at least 2 characters"],
    },
    areaOfInterest: {
      type: String,
      required: [true, "Please select an Area of Interest"],
    },
    skillAndExperience: {
      type: String,
      required: [true, "Skill and Experience is required"],
      minlength: [10, "Skill and Experience must be at least 10 characters"],
    },
    motivation: {
      type: String,
      required: [true, "Motivation is required"],
      minlength: [10, "Motivation must be at least 10 characters"],
    },
    status: {
      type: String,
      enum: ["new", "read", "responded"],
      default: "new",
    },
  },
  {
    timestamps: true,
    collection: "volunteer",
  }
);

VolunteerSchema.index({ email: 1 });
VolunteerSchema.index({ createdAt: -1 });
VolunteerSchema.index({ status: 1 });

export default models.Volunteer ||
  mongoose.model<IVolunteer>("Volunteer", VolunteerSchema);
