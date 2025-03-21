import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String, // stores uid from firebase auth,
            required: true,
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: false,
        }
    }
);


const Blog = mongoose.model("blog", blogSchema);
export default Blog;