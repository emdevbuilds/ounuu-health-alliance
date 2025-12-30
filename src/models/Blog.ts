import mongoose, { Schema, models, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    id: string;
    name: string;
    email: string;
  };
  status: "draft" | "published" | "archived";
  publishedAt?: Date;
  views: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [10, "Title must be at least 10 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9-]+$/,
        "Slug must contain only lowercase letters, numbers, and hyphens",
      ],
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      minlength: [50, "Excerpt must be at least 50 characters"],
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [100, "Content must be at least 100 characters"],
    },
    coverImage: {
      type: String,
      required: [true, "Cover image is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Health News",
        "Community Stories",
        "Medical Outreach",
        "Volunteer Highlights",
        "Emergency Relief",
        "Mental Health",
        "Success Stories",
        "Announcements",
        "Events",
        "Other",
      ],
      default: "Other",
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (tags: string[]) {
          return tags.length <= 10;
        },
        message: "Cannot have more than 10 tags",
      },
    },
    author: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    publishedAt: {
      type: Date,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "blogs",
  }
);

// Indexes for performance
BlogSchema.index({ slug: 1 });
BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ featured: 1, publishedAt: -1 });
BlogSchema.index({ createdAt: -1 });

// Text search index
BlogSchema.index({ title: "text", excerpt: "text", content: "text" });

export default models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
