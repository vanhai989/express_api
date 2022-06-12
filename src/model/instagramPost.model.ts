import mongoose, { model, Schema, Document } from 'mongoose';
import { UserDocument } from './user.model';


export interface IInstagramPost extends Document {
    user: UserDocument["_id"];
    username: string,
    nameImage: String,
    postImage: string;
    contentPost: string;
    createdAt: Date;
    updatedAt: Date;
}

const instagramPostSchema = new Schema({
    username: {type: String, required: true},
    nameImage: {type: String, required: false},
    postImage: {type: String, required: true},
    contentPost: {type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default model<IInstagramPost>('InstagramPost', instagramPostSchema);