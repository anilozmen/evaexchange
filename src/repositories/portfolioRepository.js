const {Portfolio} = require('../models/index');

const create = async (payload) => {
    return await Portfolio.create(payload);
};

module.exports = {
    create
};