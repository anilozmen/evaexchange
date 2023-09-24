const UserRepository = require('../repositories/userRepository');
const PortfolioRepository = require('../repositories/portfolioRepository');

const findAllUsers = async () => {
    return await UserRepository.findAll();
};

const findUserById = async (id) => {
    return await UserRepository.findById(id);
};

const createUser = async (payload) => {
    return await UserRepository.create(payload);
};

const updateUser = async (id, payload) => {
    return await UserRepository.update(id, payload);
};

const findUserByIdAndIncludePortfolio = async (id) => {
    return await UserRepository.findByIdAndIncludePortfolio(id);
};

const addPortfolio = async (payload) => {
    const userHasPortfolio =  await hasPortfolio(payload.userId);
    if (userHasPortfolio) throw new Error('User already has a portfolio.');
    return await PortfolioRepository.create(payload);
};

const hasPortfolio = async (id) => {
    return await UserRepository.hasPortfolio(id);
}

module.exports = {
    findAllUsers, findUserById,
    createUser, findUserByIdAndIncludePortfolio,
    addPortfolio, hasPortfolio,
    updateUser
};