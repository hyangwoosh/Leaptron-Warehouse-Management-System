const dashboard = require('../services/dashboardService');
const redisClient = require('../config/caching');

// T-Loan Overview
module.exports.currentTLoans = async (req, res) => {
    try {
        const CurrentTLoans = await redisClient.get('CurretTLoans');
        if (CurrentTLoans !== null) {
            const redisresults = JSON.parse(CurrentTLoans);
            return res.status(200).json(redisresults);
        }
        const results = await dashboard.getCurrentTLoans();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There is no incoming TLoans');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.PendingTLoans = async (req, res) => {
    try {
        const results = await dashboard.getPendingTLoans();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There is no pending TLoans');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.DraftTLoans = async (req, res) => {
    try {
        const results = await dashboard.getDraftTLoans();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There is no draft TLoans');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.ExtendedTLoans = async (req, res) => {
    try {
        const results = await dashboard.getExtendedTLoans();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There is no extended TLoans');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

// RMA Overview
module.exports.pendingRMAs = async (req, res) => {
    try {
        const results = await dashboard.getPendingRMAs();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There are no pending RMAs');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.approvedRMAs = async (req, res) => {
    try {
        const results = await dashboard.getApprovedRMAs();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There are no approved RMAs');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.processingRMAs = async (req, res) => {
    try {
        const results = await dashboard.getProcessingRMAs();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There are no RMAs being processed');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.rejectedRMAs = async (req, res) => {
    try {
        const results = await dashboard.getRejectedRMAs();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There are no rejected RMAs');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.receivedRMAs = async (req, res) => {
    try {
        const results = await dashboard.getReceivedRMAs();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There are no received RMAs');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.verifiedRMAs = async (req, res) => {
    try {
        const results = await dashboard.getVerifiedRMAs();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There are no verified RMAs');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.IPRMAs = async (req, res) => {
    try {
        const results = await dashboard.getIPRMAs();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There are no RMAs in progress');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.closedRMAs = async (req, res) => {
    try {
        const results = await dashboard.getClosedRMAs();

        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There are no closed RMAs');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

// Current T-Loan RMA Statistic
module.exports.TLoanCurrentStats = async (req, res) => {
    try {
        const results = await dashboard.getTLoanCurrentStats();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('Error retriving T-Loan Statistic');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.RMACurrentStats = async (req, res) => {
    try {
        const results = await dashboard.getRMACurrentStats();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('Error retriving RMA Statistic');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

// TLoans Request Grouped By Companies
module.exports.TLoanCompanies = async (req, res) => {
    try {
        const results = await dashboard.getTLoanCompanies();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('Error retrieving TLoanCompanies');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

// TLoans Piechart
module.exports.TloanType = async (req, res) => {
    try {
        const results = await dashboard.getTLoanType();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('Error retriving TloanTypes');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};
