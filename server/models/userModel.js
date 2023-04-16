import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    id: {
        type:String,

    },
    createdAt:{
        type: Date,
        default:  Date.now,
    },
});

const userModel = mongoose.model('userModel', userSchema);

export default userModel;