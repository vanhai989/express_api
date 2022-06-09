import { Express, Request, Response } from "express";
import {
  createPostHandler,
  updatePostHandler,
  getPostHandler,
  deletePostHandler,
  getAllPostHandler,
} from "./controller/post.controller";
import { createUserHandler } from "./controller/user.controller";
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

export default function (app: Express) {
  app.get("/healthcheck", requiresUser, (req: Request, res: Response) => res.send('hello you are got it'));

  // Register user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the user's sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

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
}
