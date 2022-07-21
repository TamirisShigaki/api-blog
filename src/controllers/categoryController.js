const rescue = require('express-rescue');
const Joi = require('joi');
const service = require('../service/index');

const create = rescue(async (req, res, next) => {
    const { error } = Joi.object({
        name: Joi.string().required(),
    }).validate(req.body);

    if (error) return next(error);

    const category = await service.category.create(req.body);

    if (!category) return next(category.error);

    return res.status(201).json(category);
});

module.exports = {
    create,
};