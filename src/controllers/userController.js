const { matchedData, validationResult } = require('express-validator');
const UserService = require('../services/userService');
const ShareService = require('../services/shareService');
const TradeService = require('../services/tradeService');

const findAllUsers = async (req, res) => {
    try {
        const users = await UserService.findAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error("UserController@findAllUsers: " + error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const findUserById = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((err) => err.msg).join(', ')
            });
        }

        const userId = req.params.userId;
        const user = await UserService.findUserById(userId);

        if (user) return res.status(200).json(user);
        res.status(404).json({ message: 'User not found.' });
    } catch (error) {
        console.error("UserController@findUserById: " + error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const findUserByIdAndIncludePortfolio = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((err) => err.msg).join(', ')
            });
        }

        const userId = req.params.userId;
        const user = await UserService.findUserByIdAndIncludePortfolio(userId);

        if (!user) return res.status(404).json({ message: 'User not found.' });
        return res.status(200).json(user);

    } catch (error) {
        console.error("UserController@findUserByIdAndIncludePortfolio: " + error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const saveUser = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((err) => err.msg).join(', ')
            });
        }

        const payload = matchedData(req);
        
        const saved = await UserService.createUser(payload);    
        return res.status(201).json(saved);
    } catch (error) {
        console.error("UserController@create: " + error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const addPortfolio = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((err) => err.msg).join(', ')
            });
        }

        const payload = matchedData(req);
        const saved = await UserService.addPortfolio(payload);
        return res.status(201).json(saved);
    } catch (error) {
        console.error("UserController@addPortfolio: " + error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const buyShare = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((err) => err.msg).join(', ')
            });
        }

        const {userId, shareId, quantity} = matchedData(req);

        const user = await UserService.findUserByIdAndIncludePortfolio(userId);
        const portfolioId = user.Portfolio.id;

        const share = await ShareService.findShareById(shareId);

        const totalPrice = quantity * share.rate;

        if (user.balance < totalPrice) return res.status(400).json({ message: 'You do not have sufficient balance.' });

        // User's balance update.
        await UserService.updateUser(userId, {
            balance: (user.balance - totalPrice)
        });

        const savedTrade = await TradeService.createTrade({
            portfolioId: portfolioId,
            shareId: shareId,
            action: 'BUY',
            quantity: quantity
        });
        
        return res.status(200).json(savedTrade);

    } catch (error) {
        console.error("UserController@buyShare: " + error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const sellShare = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array().map((err) => err.msg).join(', ')
            });
        }

        const {userId, shareId, quantity} = matchedData(req);

        const user = await UserService.findUserByIdAndIncludePortfolio(userId);
        const portfolioId = user.Portfolio.id;

        const share = await ShareService.findShareById(shareId);

        const trades = await TradeService.findTradeByPortfolioIdAndShareId(portfolioId, shareId);

        if (trades.length === 0) return res.status(400).json({ message: 'You don\'t have this share.' });

        let tradeArray = {};
        tradeArray['BUY'] = 0;
        tradeArray['SELL'] = 0;
        
        trades.forEach(trade => {
            tradeArray[trade.action] += trade.quantity;
        });

        const netShares = tradeArray['BUY'] - tradeArray['SELL'];

        if (quantity > netShares) return res.status(400).json({ message: 'You don\'t have a sufficient quantity of shares.' });
        
        let userBalance = parseFloat(user.balance);
        let totalSoldPrice = parseFloat(quantity * share.rate);

        await UserService.updateUser(userId, {
            balance: parseFloat(totalSoldPrice + userBalance).toFixed(2)
        });

        const saved = await TradeService.createTrade({
            portfolioId: portfolioId,
            shareId: shareId,
            action: 'SELL',
            quantity: quantity
        })

        return res.status(200).json(saved);

    } catch (error) {
        console.error("UserController@sellShare: " + error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    findAllUsers, findUserById, 
    findUserByIdAndIncludePortfolio,
    saveUser, addPortfolio,
    buyShare, sellShare
}