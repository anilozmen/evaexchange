const {Share} = require('../models/index');

const findAll = async (options = {}) => {
    return await Share.findAll(options);
};

const findById = async (id, options = {}) => {
    return await Share.findByPk(id, options);
};

const existByName = async (name) => {
    const share = await Share.findOne({ where: { name: name } });
    return (share !== null);
};

const create = async (payload) => {
    return await Share.create(payload);
};

const update = async (id, payload) => {
    const share = await findById(id);

    if (share) {
        const timeDifference = new Date() - share.updatedAt;

        if (timeDifference >= 3600000) {
            return await share.update(payload);
        } else {
            throw new Error('You should wait 1 hour since the last update.');
        }
    }    
};

module.exports = {
    findAll, findById, existByName,
    create, update
};