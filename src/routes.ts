import { Express, Request, Response } from "express";
import {
  createPostHandler,
  updatePostHandler,
  getPostHandler,
  deletePostHandler,
  getAllPostHandler,
} from "./controller/post.controller";
import { createUserHandler, updateUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
  refreshToken,
} from "./controller/session.controller";
import { validateRequest, requiresUser } from "./middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
} from "./schema/post.schema";
import log from "./logger";
import { createPhoto, getPhotos } from "./controller/photo.controller";
import upload from "./middleware/upload";
import { createInstagramPost, getInstagramPosts } from "./controller/instagramPost.controller";
import instagramPostModel from "./model/instagramPost.model";

export default function (app: Express) {
  // app.get("/healthcheck", requiresUser, (req: Request, res: Response) => res.send({message: 'hello you are got it'}));
  app.get("/healthcheck", (req: Request, res: Response) => res.send({message: 'hello you are got it'}));

  // Register user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // change avatar
  app.put(
    "/api/user",
    requiresUser, upload.single('avatar'),
    updateUserHandler
  );

  // Get the user's sessions
  app.get("/api/users", requiresUser, getUserSessionsHandler);

  // refresh token
  app.post("/api/refreshToken", refreshToken);

  // Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // Create a post
  app.post(
    "/api/posts",
    [requiresUser, validateRequest(createPostSchema)],
    createPostHandler
  );

  // Update a post
  app.put(
    "/api/posts/:postId",
    [requiresUser, validateRequest(updatePostSchema)],
    updatePostHandler
  );

  // Get a post
  app.get("/api/posts/:postId", getPostHandler);

  // Get all posts
  app.get("/api/posts", getAllPostHandler);

  // Delete a post
  app.delete(
    "/api/posts/:postId",
    [requiresUser, validateRequest(deletePostSchema)],
    deletePostHandler
  );

  // upload imgs
  app.post('/api/photos', requiresUser, upload.single('img'), createPhoto);
  app.get('/api/photos', getPhotos);
  // app.get('/photos/:id', requiresUser, getPhoto);
  // app.put('/photos/:id', requiresUser, updatePhoto);
  // app.delete('/photos/:id', requiresUser, deletePhoto);

  // instagram post
  app.post('/api/instagrampost', requiresUser, upload.single('postImage'), createInstagramPost);
  app.get('/api/instagramposts', requiresUser, async (req: Request, res: Response) => {
    const instagramPosts: any = await instagramPostModel.find().lean();
    res.json(instagramPosts)
  });

}
