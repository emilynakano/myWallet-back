import postSchema from '../schemas/postSchema.js'

export default async function postValidationMiddlware(req, res, next) {
    const validation = postSchema.validate(req.body);
    if(validation.error) {
        return res.sendStatus(422)
    }
    next()
}