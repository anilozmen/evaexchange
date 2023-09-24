const ShareRepository = require('../repositories/shareRepository');

const findAllShares = async () => {
    return await ShareRepository.findAll();
};

const findShareById = async (id) => {
    return await ShareRepository.findById(id);
};

const existByName = async (name) => {
    return await ShareRepository.existByName(name);
};

const createShare = async (payload) => {
    return await ShareRepository.create(payload);
};

const updateShareById = async (id, payload) => {
    return await ShareRepository.update(id, payload);
};

module.exports = {
    findAllShares, findShareById,
    existByName, createShare,
    updateShareById
};