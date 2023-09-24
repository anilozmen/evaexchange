const {Trade} = require('../models/index');

const findAll = async (options = {}) => {
    return await Trade.findAll(options);
};

const findById = async (id, options = {}) => {
    return await Trade.findByPk(id, options);
};

const findByPortfolioId = async (portfolioId) => {
    return await findAll({where: { portfolioId: portfolioId }});
};

const findByShareId = async (shareId) => {
    return await findAll({where: { shareId: shareId }});
};

const findByPortfolioIdAndShareId = async (portfolioId, shareId) => {
    return await findAll({where: {portfolioId: portfolioId, shareId: shareId}});
};

const create = async (payload) => {
    return await Trade.create(payload);
};

module.exports = {
    findAll, findById, create,
    findByPortfolioId, findByShareId,
    findByPortfolioIdAndShareId
};