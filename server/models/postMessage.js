import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    creator: String,
    name: String,
    creator:String,
    title:String,
    message : String,
    tags: [String],
    selectedFiles :String,
    likes:{
        type:[String],
        default:[],
    },
    createdAt:{
        type: Date,
        default:  Date.now,
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;