const TradeRepository = require('../repositories/tradeRepository');

const findAllTrades = async () => {
    return await TradeRepository.findAll();
};

const findTradeById = async (id) => {
    return await TradeRepository.findById(id);
};

const findTradeByPortfolioId = async (portfolioId) => {
    return await TradeRepository.findByPortfolioId(portfolioId);
};

const findTradeByShareId = async (shareId) => {
    return await TradeRepository.findByShareId(shareId);
};

const findTradeByPortfolioIdAndShareId = async (portfolioId, shareId) => {
    return await TradeRepository.findByPortfolioIdAndShareId(portfolioId, shareId);
};

const createTrade = async (payload) => {
    return await TradeRepository.create(payload);
};

module.exports = {
    findAllTrades, findTradeById,
    findTradeByPortfolioId, findTradeByShareId,
    createTrade, findTradeByPortfolioIdAndShareId
};