const PortfolioRepository = require('../repositories/portfolioRepository');

const createPortfolio = async (payload) => {
    return await PortfolioRepository.create(payload);
};

module.exports = {
    createPortfolio
};