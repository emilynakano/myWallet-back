import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid';
import db from '../database/db.js'

export async function signUp (req, res) {
    const { name, email, password } = req.body;

    try {
        const passwordHash  = bcrypt.hashSync(password, 10);
        await db.collection('users').insertOne({name, email, password:passwordHash});
        res.sendStatus(201)
    } catch {
        res.sendStatus(500)
    }
    
}

export async function signIn (req, res) {
    const { email, password } = req.body;
    
    try {
        const user = await db.collection('users').findOne({ email });

        if(user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await db.collection("sessions").insertOne({
                userId: user._id,
                token
            })
            res.send({token, name:user.name});
        } else {
            res.sendStatus(401)
        }
    } catch {
        res.sendStatus(500)
    }
}