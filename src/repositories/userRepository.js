const {User, Portfolio} = require('../models/index');

const findAll = async (options = {}) => {
    return await User.findAll(options);
};

const findById = async (id, options = {}) => {
    return await User.findByPk(id, options);
};

const create = async (payload) => {
    return await User.create(payload);
};

const update = async (id, payload) => {
    const user = await findById(id);
    if (user) return await user.update(payload);
};

const findByIdAndIncludePortfolio = async (id) => {
    return await findById(id, {
        include: {
            model: Portfolio, attributes: ['id', 'name']
        }
    });
};

const hasPortfolio = async (id) => {
    const user = await findByIdAndIncludePortfolio(id);
    return (user !== null && user.Portfolio !== null);
};

module.exports = {
    findAll, findById, create, 
    update, findByIdAndIncludePortfolio, 
    hasPortfolio
};