import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI)
let db;

client.connect().then(() => {
    db = client.db("myWallet")
})

const server = express();

server.use(json())
server.use(cors())

console.log("oi")

server.listen(5000)