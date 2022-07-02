import joi from "joi"

const postSchema = joi.object ({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.valid('add', 'exit').required()
})
export default postSchema;