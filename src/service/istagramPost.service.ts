import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import InstagramPost from "../model/instagramPost.model";

export function createInstagramPostService(input: any) {
  return InstagramPost.create(input._doc);
}