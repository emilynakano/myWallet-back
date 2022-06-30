import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";

import {signUp, signIn} from './controllers/userController.js'

dotenv.config()

const server = express();
server.use(json())

server.use(cors())

server.post('/sign-up', signUp)

server.post("/sign-in", signIn);


server.listen(process.env.PORT)