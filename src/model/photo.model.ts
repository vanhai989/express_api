import { model, Schema, Document } from 'mongoose';

export interface IPhoto extends Document {
    name: string,
    img: string;
}

const photoSchema = new Schema({
    name: {type: String, required: true},
    img: {type: String, required: true}
});

export default model<IPhoto>('Photo', photoSchema);