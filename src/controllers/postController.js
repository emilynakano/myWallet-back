import joi from 'joi'
import dayjs from 'dayjs'
import db from '../database/db.js'

export async function sendPost(req, res) {
    const { user } = res.locals;
    
    const post = req.body;

    await db.collection('posts').insertOne(
        {...post, 
            userId: user._id, 
            date: dayjs().format('DD/MM')
        })
    res.sendStatus(200)
}
export async function getPost(req, res) {
    const {user} = res.locals;
    
    const post = await db.collection('posts').find({userId: user._id}).toArray();
    res.send(post)
}