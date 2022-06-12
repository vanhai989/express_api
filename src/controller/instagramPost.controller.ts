import { ExecException } from 'child_process';
import config from "config";
import { Response } from 'express';
import { get } from 'lodash';
import log from '../logger';
import InstagramPostModel from '../model/instagramPost.model';
import Photo from '../model/photo.model';
import { createInstagramPostService } from '../service/istagramPost.service';

const port = config.get("port") as number;
const host = config.get("host") as string;

export async function getInstagramPosts (req: Request, res: Response) {
  const instagramPosts: any = await InstagramPostModel.find().lean();
  res.json(instagramPosts)
};

export async function createInstagramPost(req: any, res: Response) {
 try {
  const userId = get(req, "user._id");
  const index = req.file.path.lastIndexOf('/');
  const pathName = req.file.path.slice(index);
  const instagramPost = new InstagramPostModel({
    username: req.body.username,
    nameImage: req.body.nameImage,
    postImage: `http://${host}:${port}${pathName}`,
    contentPost: req.body.contentPost,
    user: userId,
  })
  const post = await createInstagramPostService({ ...instagramPost });

  const photo = new Photo({
    name: req.body.nameImage,
    img: `http://${host}:${port}${pathName}`,
  });

  photo
    .save().then((res: any) => {
      console.log("image is saved");
    })
    .catch((err: ExecException) => {
      console.log(err, "error has occured when store img");
    });

  return res.send(post);
 } catch (error) {
   log.error('body is invalid')
  return res.status(400);
 }
};