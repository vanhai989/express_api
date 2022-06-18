import { Request, Response } from "express";
import { get, isEmpty, omit } from "lodash";
import { createUser } from "../service/user.service";
import log from "../logger";
import Photo, {} from '../model/photo.model';
import config from "config";
import User from "../model/user.model";
const port = config.get("port") as number;
const host = config.get("host") as string;
const fs = require('fs')

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function updateUserHandler(req: any, res: Response) {
  try {
    const userInfo = get(req, "user");
    let user = await User.findOne({ _id: userInfo });
    const index = req.file.path.lastIndexOf('/');
    const pathName = req.file.path.slice(index);
    const nameImage = pathName.slice(1, pathName.lastIndexOf('.'));
    
    if (!isEmpty(userInfo?.avatar)) {
      const index = userInfo?.avatar.lastIndexOf('/');
      const pathName = userInfo?.avatar.slice(index);
      console.log('pathName', pathName);
      await fs.unlink("./src/images"+pathName,function(err: any){
        if(err) throw err;
        console.log('File deleted!');
    });
    }
      const photo = new Photo({
          name: nameImage,
          img: `http://${host}:${port}${pathName}`,
        });
        photo
          .save()
          .then((res: any) => {
            console.log("image is saved");
          })
          .catch((err: any) => {
            console.log(err, "error has occured when store img");
          });
  
    if (!user) {
      return res.sendStatus(404);
    }
    user.avatar = photo.img
    await user.save();
    const userUpdated = await User.findOne();
    
    return res.send(userUpdated);
  } catch (error) {
    console.log('error', error);
    return res.sendStatus(401);
  }
}
