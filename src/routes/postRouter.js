import { Router } from "express";
import { getPost, sendPost } from "../controllers/postController.js";
import tokenValidationMiddleware from '../middlewares/tokenValidationMiddleware.js'
import postValidationMiddlware from "../middlewares/postSchemaValidationMiddlware.js";
const postRouter = Router();

postRouter.post('/post', tokenValidationMiddleware, postValidationMiddlware, sendPost)
postRouter.get('/post', tokenValidationMiddleware, getPost)

export default postRouter