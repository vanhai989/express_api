import mongoose, { model, Schema, Document } from 'mongoose';
import { UserDocument } from './user.model';


export interface IInstagramPost extends Document {
    user: UserDocument["_id"];
    username: string,
    postImage: string;
    contentPost: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}

const instagramPostSchema = new Schema({
    username: {type: String, required: true},
    postImage: {type: String, required: true},
    avatar: {type: String, required: false},
    contentPost: {type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default model<IInstagramPost>('InstagramPost', instagramPostSchema);