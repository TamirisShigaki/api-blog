const rescue = require('express-rescue');
const Joi = require('joi');
const service = require('../service/index');

const create = rescue(async (req, res, next) => {
    const { error } = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        categoryIds: Joi.array().items(Joi.number().required()).required(),
    }).validate(req.body);

    if (error) return res.status(400).json({ message: 'Some required fields are missing' });
    
    const { id } = req.user;

    const newPost = await service.post.create(req.body, id);

    if (newPost.error) return next(newPost.error);

    return res.status(201).json(newPost);
});

module.exports = {
    create,
};