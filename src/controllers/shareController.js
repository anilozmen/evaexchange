const ShareService = require('../services/shareService');
const { matchedData, validationResult } = require('express-validator');

const findAllShares = async (req, res) => {
    try {
        const shares = await ShareService.findAllShares();
        return res.status(200).json(shares);
    } catch (error) {
        console.error("ShareController@findAllShares: " + error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const findShareById = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((err) => err.msg).join(', ')
            });
        }

        const shareId = matchedData(req).shareId;
        const share = await ShareService.findShareById(shareId);

        if (share) return res.status(200).json(share);
        return res.status(404).json({ message: 'Share not found.' });
    } catch (error) {
        console.error("ShareController@findShareById: " + error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const saveShare = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((err) => err.msg).join(', ')
            });
        }

        const payload = matchedData(req);
        const saved = await ShareService.createShare(payload);

        return res.status(201).json(saved);
    } catch (error) {
        console.error("ShareController@saveShare: " + error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const updateShareById = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((err) => err.msg).join(', ')
            });
        }

        const payload = matchedData(req);
        await ShareService.updateShareById(payload.shareId, { rate: payload.rate });
        return res.sendStatus(204);
    } catch (error) {
        console.error("ShareController@updateShareById: " + error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    findAllShares, findShareById, 
    saveShare, updateShareById
};