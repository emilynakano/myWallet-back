import userSchema from "../schemas/userSchema.js"
export default async function (req, res, next) {
    const validate = userSchema.validate(req.body);
    if(validate.error) {
        return res.sendStatus(422);
    }
    next();
}