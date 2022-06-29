import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from 'bcrypt'
import joi from 'joi'
import { v4 as uuid } from 'uuid';

dotenv.config()

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI)
let db;

client.connect().then(() => {
    db = client.db(process.env.MONGO_DATABASE)
})

const server = express();

server.use(json())

server.use(cors())

server.post('/sign-up', async(req, res) => {
    const { name, email, password } = req.body;

    const userSchema = joi.object ({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        chechPassword: joi.any().valid(joi.ref('password')).required()
    })

    try {
        const {error} = userSchema.validate(req.body)
        if(error) {
            return res.sendStatus(400)
        }
        const passwordHash  = bcrypt.hashSync(password, 10);
        await db.collection('users').insertOne({name, email, password:passwordHash});
        res.sendStatus(201)
    } catch {
        res.sendStatus(500)
    }
    
})

server.post("/sign-in", async (req, res) => {
    const { email, password } = req.body;
    
    const user = await db.collection('users').findOne({ email });
    console.log(user)
    if(user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();
		await db.collection("sessions").insertOne({
			userId: user._id,
            token
		})
        res.send(token);
    } else {
        res.sendStatus(401)
    }
    
});

server.listen(process.env.PORT)