const TLoan = require('../services/tLoanService');
const redisClient = require('../config/caching');
const {
    tloanAcceptedMail,
    tloanRejectedMail,
    tloanExtensionAcceptedMail,
    tloanExtensionRejectedMail
} = require('./emailNotificationController');
const {
    tloanAcceptedTele,
    tloanRejectedTele,
    tloanExtensionAcceptedTele,
    tloanExtensionRejectedTele
} = require('./telegramNotificationController');
const { createNotification } = require('./notificationController');

module.exports.getLoanByNo = async (req, res) => {
    const { TLoanID } = req.params;
    try {
        const loanDetail = await redisClient.get(`TLoan#${TLoanID}`);
        if (loanDetail !== null) {
            const redisresults = JSON.parse(loanDetail);
            return res.status(200).json(redisresults);
        }
        let output = [];
        const results = await TLoan.getLoanByNumber(TLoanID);
        if (results[0].length > 0) {
            [output] = results;
            const IDOfTLoan = results[0][0].TLoanID;
            const results2 = await TLoan.getTLoanOutItem(IDOfTLoan);
            if (results2.length > 0) {
                [output[0].Items] = results2;
                // output = output[0];
            }
            redisClient.set(`TLoan#${TLoanID}`, JSON.stringify(output[0]), {
                EX: 60 * 10
            });
            return res.status(200).send(output[0]);
        }
        return res.status(404).json({ message: 'Cannot Find TLoan' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getItemsByTloan = async (req, res) => {
    const { TLoanID } = req.params;
    try {
        const TLoanItems = await redisClient.get(`TLoanItems#${TLoanID}`);
        if (TLoanItems !== null) {
            const redisresults = JSON.parse(TLoanItems);
            return res.status(200).json(redisresults);
        }
        // const results1 = await TLoan.getLoanByNumber(TLoanID);
        // const IDOfTLoan = results1[0][0].TLoanID;
        const results = await TLoan.getTLoanOutItem(TLoanID);
        if (results.length > 0) {
            redisClient.set(`TLoanItems#${TLoanID}`, JSON.stringify(results[0]), {
                EX: 60 * 10
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'This TLoan has no items' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getIDofLoan = async (req, res) => {
    const { TLoanID } = req.params;
    try {
        const TLoanIDs = await redisClient.get(`TLoanIDs#${TLoanID}`);
        if (TLoanIDs !== null) {
            const redisresults = JSON.parse(TLoanIDs);
            return res.status(200).json(redisresults);
        }

        const results = await TLoan.getID(TLoanID);
        if (results.length > 0) {
            redisClient.set(`TLoanIDs#${TLoanID}`, JSON.stringify(results[0]), {
                EX: 60 * 10
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'There is no ID' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.allLoan = async (req, res) => {
    try {
        const TLoans = await redisClient.get('AllTLoans');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getAll();

        if (results.length > 0) {
            redisClient.set('AllTLoans', JSON.stringify(results[0]), {
                EX: 60 * 60 * 2
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'You have not made any TLoans' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.SubmitAfterEdit = async (req, res) => {
    const { TLoanID } = req.params;
    const {
        type,
        company,
        purpose,
        applicationdate,
        duration,
        requireddate,
        email,
        collection,
        shipping,
        items
    } = req.body;

    try {
        const gettingInfo = await TLoan.getEmployeeInfo(TLoanID);
        const UserID = gettingInfo[0][0].UserID.toString();
        const results = await TLoan.getLoanByNumber(TLoanID);
        const tloanItems = items.map((item) => {
            return item;
        });
        const getManagerID = await TLoan.getSalesManagerID();
        const managerid = getManagerID[0][0].UserID;
        if (results.length > 0) {
            await TLoan.DeleteProductsByID(TLoanID);
            const results2 = await TLoan.SubmitAfterEdit(
                TLoanID,
                type,
                company,
                purpose,
                applicationdate,
                duration,
                requireddate,
                email,
                collection,
                shipping,
                managerid,
                tloanItems
            );
            if (results2.length > 0) {
                redisClient.del(`TLoanItems#${TLoanID}`);
                redisClient.del(`TLoan#${TLoanID}`);
                redisClient.del(`TLoanIDs#${TLoanID}`);
                redisClient.del(`ManagerLoan#${managerid}`);
                redisClient.del(`ManagerExtension#${managerid}`);
                redisClient.del(`TLoanStatusID#${TLoanID}`);
                redisClient.del(`ExtensionStatus#${TLoanID}`);
                redisClient.del(`CurrentTLoan#${UserID}`);
                redisClient.del(`PendingTLoan#${UserID}`);
                redisClient.del(`DraftTLoan#${UserID}`);
                redisClient.del(`HistoryTLoan#${UserID}`);

                return res.status(200).json({ message: 'Draft has been submitted' });
            }
            return res.status(400).json({ message: 'Submit draft failed' });
        }
        return res.status(400).json({ message: 'Submit draft failed' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.DraftAfterEdit = async (req, res) => {
    const { TLoanID } = req.params;
    const {
        type,
        company,
        purpose,
        applicationdate,
        duration,
        requireddate,
        email,
        collection,
        shipping,
        items
    } = req.body;

    try {
        const gettingInfo = await TLoan.getEmployeeInfo(TLoanID);
        const UserID = gettingInfo[0][0].UserID.toString();
        const results = await TLoan.getLoanByNumber(TLoanID);
        const tloanItems = items.map((item) => {
            return item;
        });

        if (results.length > 0) {
            await TLoan.DeleteProductsByID(TLoanID);
            const results2 = await TLoan.DraftAfterEdit(
                TLoanID,
                type,
                company,
                purpose,
                applicationdate,
                duration,
                requireddate,
                email,
                collection,
                shipping,
                tloanItems
            );
            if (results2.length > 0) {
                redisClient.del(`TLoanItems#${TLoanID}`);
                redisClient.del(`TLoan#${TLoanID}`);
                redisClient.del(`TLoanIDs#${TLoanID}`);
                redisClient.del(`TLoanStatusID#${TLoanID}`);
                redisClient.del(`ExtensionStatus#${TLoanID}`);
                redisClient.del(`CurrentTLoan#${UserID}`);
                redisClient.del(`PendingTLoan#${UserID}`);
                redisClient.del(`DraftTLoan#${UserID}`);
                redisClient.del(`HistoryTLoan#${UserID}`);
                return res.status(200).json({ message: 'Draft has been saved' });
            }
            return res.status(400).json({ message: 'Draft failed to save' });
        }
        return res.status(400).json({ message: 'Draft failed to save' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.newLoan = async (req, res) => {
    const {
        type,
        company,
        name,
        purpose,
        applicationdate,
        duration,
        requireddate,
        user,
        email,
        collection,
        shipping,
        items
    } = req.body;
    try {
        const tloanItems = items.map((item) => {
            return item;
        });
        const getManagerID = await TLoan.getSalesManagerID();
        const managerid = getManagerID[0][0].UserID;
        const results = await TLoan.createTLoan(
            type,
            company,
            name,
            purpose,
            applicationdate,
            duration,
            requireddate,
            user,
            email,
            collection,
            shipping,
            managerid,
            tloanItems
        );
        if (results.length > 0) {
            redisClient.del(`ManagerLoan#${managerid}`);
            redisClient.del(`ManagerExtension#${managerid}`);
            redisClient.del(`CurrentTLoan#${user}`);
            redisClient.del(`PendingTLoan#${user}`);
            redisClient.del(`DraftTLoan#${user}`);
            redisClient.del(`HistoryTLoan#${user}`);
            return res.status(201).json({ message: 'Loan has been successfully created' });
        }
        return res.status(400).json({ message: 'Loan failed to submit' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.SendDraft = async (req, res) => {
    const {
        type,
        company,
        name,
        purpose,
        applicationdate,
        duration,
        requireddate,
        user,
        email,
        collection,
        shipping,
        items
    } = req.body;
    try {
        const tloanItems = items.map((item) => {
            return item;
        });
        const results = await TLoan.SendTLoanToDraft(
            type,
            company,
            name,
            purpose,
            applicationdate,
            duration,
            requireddate,
            user,
            email,
            collection,
            shipping,
            tloanItems
        );
        if (results.length > 0) {
            redisClient.del(`CurrentTLoan#${user}`);
            redisClient.del(`PendingTLoan#${user}`);
            redisClient.del(`DraftTLoan#${user}`);
            redisClient.del(`HistoryTLoan#${user}`);
            return res.status(201).json({ message: 'Draft has been created' });
        }
        return res.status(400).json({ message: 'Draft failed to save' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.currentLoan = async (req, res) => {
    const { UserID } = req.params;

    try {
        const TLoans = await redisClient.get(`CurrentTLoan#${UserID}`);
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getCurrent(UserID);
        if (results.length > 0) {
            redisClient.set(`CurrentTLoan#${UserID}`, JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'You have not made any TLoans' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.draftsLoan = async (req, res) => {
    const { UserID } = req.params;
    try {
        const TLoans = await redisClient.get(`DraftTLoan#${UserID}`);
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getDraft(UserID);
        if (results.length > 0) {
            redisClient.set(`DraftTLoan#${UserID}`, JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'You have not made any TLoans' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.historyLoan = async (req, res) => {
    const { UserID } = req.params;
    try {
        const TLoans = await redisClient.get(`HistoryTLoan#${UserID}`);
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getHistory(UserID);
        if (results.length > 0) {
            redisClient.set(`HistoryTLoan#${UserID}`, JSON.stringify(results[0]));
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'You have not made any TLoans' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.pendingLoan = async (req, res) => {
    const { UserID } = req.params;
    try {
        const TLoans = await redisClient.get(`PendingTLoan#${UserID}`);
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getPending(UserID);
        if (results.length > 0) {
            redisClient.set(`PendingTLoan#${UserID}`, JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'You have not made any TLoans' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.approveLoan = async (req, res) => {
    const { TLoanID } = req.params;
    try {
        const gettingInfo = await TLoan.getEmployeeInfo(TLoanID);
        const email = gettingInfo[0][0].Email;
        const username = gettingInfo[0][0].Username;
        const { UserID } = gettingInfo[0][0];
        const telegramid = gettingInfo[0][0].TelegramID;
        const results = await TLoan.getLoanByNumber(TLoanID);
        const getManagerIDFromTLoan = await TLoan.getManagerIDFromTLoan(TLoanID);
        const { SalesManagerID } = getManagerIDFromTLoan[0][0];
        if (results.length > 0) {
            await TLoan.approveLoan(TLoanID);
            if (telegramid !== null) {
                tloanAcceptedTele(telegramid, username, TLoanID);
            }
            createNotification(10, UserID, TLoanID);
            tloanAcceptedMail(email, username, TLoanID);
            redisClient.del(`ManagerLoan#${SalesManagerID}`);
            redisClient.del(`ManagerExtension#${SalesManagerID}`);
            redisClient.del('ApprovedLoan');
            redisClient.del(`TLoanItems#${TLoanID}`);
            redisClient.del(`TLoan#${TLoanID}`);
            redisClient.del(`TLoanIDs#${TLoanID}`);
            redisClient.del(`TLoanStatusID#${TLoanID}`);
            redisClient.del(`ExtensionStatus#${TLoanID}`);
            redisClient.del(`CurrentTLoan#${UserID}`);
            redisClient.del(`PendingTLoan#${UserID}`);
            redisClient.del(`DraftTLoan#${UserID}`);
            redisClient.del(`HistoryTLoan#${UserID}`);
            return res.status(200).json({ message: 'Status has been Updated' });
        }
        return res.status(500).json({ message: 'Internal Server Error!' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.rejectLoan = async (req, res) => {
    const { TLoanID } = req.params;
    const { remarks } = req.body;
    try {
        const gettingInfo = await TLoan.getEmployeeInfo(TLoanID);
        const email = gettingInfo[0][0].Email;
        const username = gettingInfo[0][0].Username;
        const { UserID } = gettingInfo[0][0];
        const telegramid = gettingInfo[0][0].TelegramID;
        const results = await TLoan.getLoanByNumber(TLoanID);
        const getManagerIDFromTLoan = await TLoan.getManagerIDFromTLoan(TLoanID);
        const { SalesManagerID } = getManagerIDFromTLoan[0][0];
        if (results.length > 0) {
            await TLoan.rejectLoan(TLoanID, remarks);
            if (telegramid !== null) {
                tloanRejectedTele(telegramid, username, TLoanID, remarks);
            }
            createNotification(11, UserID, TLoanID);
            tloanRejectedMail(email, username, TLoanID, remarks);
            redisClient.del(`ManagerLoan#${SalesManagerID}`);
            redisClient.del(`ManagerExtension#${SalesManagerID}`);
            redisClient.del(`TLoanItems#${TLoanID}`);
            redisClient.del(`TLoan#${TLoanID}`);
            redisClient.del(`TLoanIDs#${TLoanID}`);
            redisClient.del(`TLoanStatusID#${TLoanID}`);
            redisClient.del(`ExtensionStatus#${TLoanID}`);
            redisClient.del(`CurrentTLoan#${UserID}`);
            redisClient.del(`PendingTLoan#${UserID}`);
            redisClient.del(`DraftTLoan#${UserID}`);
            redisClient.del(`HistoryTLoan#${UserID}`);
            return res.status(200).json({ message: 'Status has been Updated' });
        }
        return res.status(500).json({ message: 'Internal Server Error!' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.approveExtension = async (req, res) => {
    const { TLoanID } = req.params;
    try {
        const gettingInfo = await TLoan.getEmployeeInfo(TLoanID);
        const email = gettingInfo[0][0].Email;
        const username = gettingInfo[0][0].Username;
        const { UserID } = gettingInfo[0][0];
        const telegramid = gettingInfo[0][0].TelegramID;
        const results = await TLoan.getLoanByNumber(TLoanID);
        const getManagerIDFromTLoan = await TLoan.getManagerIDFromTLoan(TLoanID);
        const { SalesManagerID } = getManagerIDFromTLoan[0][0];
        if (results.length > 0) {
            await TLoan.approveExtension(TLoanID);
            if (telegramid !== null) {
                tloanExtensionAcceptedTele(telegramid, username, TLoanID);
            }
            createNotification(14, UserID, TLoanID);
            tloanExtensionAcceptedMail(email, username, TLoanID);
            redisClient.del(`ManagerLoan#${SalesManagerID}`);
            redisClient.del(`ManagerExtension#${SalesManagerID}`);
            redisClient.del(`TLoanItems#${TLoanID}`);
            redisClient.del(`TLoan#${TLoanID}`);
            redisClient.del(`TLoanIDs#${TLoanID}`);
            redisClient.del(`TLoanStatusID#${TLoanID}`);
            redisClient.del(`ExtensionStatus#${TLoanID}`);
            redisClient.del(`CurrentTLoan#${UserID}`);
            redisClient.del(`PendingTLoan#${UserID}`);
            redisClient.del(`DraftTLoan#${UserID}`);
            redisClient.del(`HistoryTLoan#${UserID}`);
            return res.status(200).json({ message: 'Status has been Updated' });
        }
        return res.status(400).json({ message: 'Status failed to Update' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.rejectExtension = async (req, res) => {
    const { TLoanID } = req.params;
    const { remarks } = req.body;
    try {
        const gettingInfo = await TLoan.getEmployeeInfo(TLoanID);
        const email = gettingInfo[0][0].Email;
        const username = gettingInfo[0][0].Username;
        const { UserID } = gettingInfo[0][0];
        const telegramid = gettingInfo[0][0].TelegramID;
        const results = await TLoan.getLoanByNumber(TLoanID);
        const getManagerIDFromTLoan = await TLoan.getManagerIDFromTLoan(TLoanID);
        const { SalesManagerID } = getManagerIDFromTLoan[0][0];
        if (results.length > 0) {
            await TLoan.rejectExtension(TLoanID, remarks);
            if (telegramid !== null) {
                tloanExtensionRejectedTele(telegramid, username, TLoanID, remarks);
            }
            createNotification(15, UserID, TLoanID);
            tloanExtensionRejectedMail(email, username, TLoanID, remarks);
            redisClient.del(`ManagerLoan#${SalesManagerID}`);
            redisClient.del(`ManagerExtension#${SalesManagerID}`);
            redisClient.del(`TLoanItems#${TLoanID}`);
            redisClient.del(`TLoan#${TLoanID}`);
            redisClient.del(`TLoanIDs#${TLoanID}`);
            redisClient.del(`TLoanStatusID#${TLoanID}`);
            redisClient.del(`ExtensionStatus#${TLoanID}`);
            redisClient.del(`CurrentTLoan#${UserID}`);
            redisClient.del(`PendingTLoan#${UserID}`);
            redisClient.del(`DraftTLoan#${UserID}`);
            redisClient.del(`HistoryTLoan#${UserID}`);
            return res.status(200).json({ message: 'Status has been Updated' });
        }
        return res.status(400).json({ message: 'Status failed to Update' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.ManagerLoan = async (req, res) => {
    const { SalesManagerID } = req.params;
    try {
        const TLoans = await redisClient.get(`ManagerLoan#${SalesManagerID}`);
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getManagerLoan(SalesManagerID);
        if (results.length > 0) {
            redisClient.set(`ManagerLoan#${SalesManagerID}`, JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'No Loans that are in need of approval' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.ManagerExtension = async (req, res) => {
    const { SalesManagerID } = req.params;

    try {
        const TLoans = await redisClient.get(`ManagerExtension#${SalesManagerID}`);
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getManagerExtension(SalesManagerID);
        if (results.length > 0) {
            redisClient.set(`ManagerExtension#${SalesManagerID}`, JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'No Extensions that are in need of approval' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.LoanExtend = async (req, res) => {
    const { TLoanID, duration, reason } = req.body;
    try {
        const gettingInfo = await TLoan.getEmployeeInfo(TLoanID);
        const UserID = gettingInfo[0][0].UserID.toString();
        const results = await TLoan.loanExtension(TLoanID, duration, reason);
        const getManagerIDFromTLoan = await TLoan.getManagerIDFromTLoan(TLoanID);
        const { SalesManagerID } = getManagerIDFromTLoan[0][0];
        if (results.length > 0) {
            redisClient.del(`TLoanItems#${TLoanID}`);
            redisClient.del(`TLoan#${TLoanID}`);
            redisClient.del(`TLoanIDs#${TLoanID}`);
            redisClient.del(`ManagerLoan#${SalesManagerID}`);
            redisClient.del(`ManagerExtension#${SalesManagerID}`);
            redisClient.del(`TLoanStatusID#${TLoanID}`);
            redisClient.del(`ExtensionStatus#${TLoanID}`);
            redisClient.del(`CurrentTLoan#${UserID}`);
            redisClient.del(`PendingTLoan#${UserID}`);
            redisClient.del(`DraftTLoan#${UserID}`);
            redisClient.del(`HistoryTLoan#${UserID}`);
            return res.status(201).json(results[0]);
        }

        return res.status(400).json({ message: 'Could not submit extension request' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.extensionStatus = async (req, res) => {
    const { TLoanID } = req.params;
    try {
        const TLoans = await redisClient.get(`ExtensionStatus#${TLoanID}`);
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getExtensionStatus(TLoanID);
        if (results.length > 0) {
            redisClient.set(`ExtensionStatus#${TLoanID}`, JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'Does not Exist!' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getApprovedLoan = async (req, res) => {
    try {
        const TLoans = await redisClient.get('ApprovedLoan');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getApproved();
        if (results.length > 0) {
            redisClient.set('ApprovedLoan', JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'No approved Loans available' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
module.exports.getPickingLoan = async (req, res) => {
    try {
        const TLoans = await redisClient.get('PickingLoan');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getPicking();
        if (results.length > 0) {
            redisClient.set('PickingLoan', JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'No approved Loans available' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
module.exports.getReadyLoan = async (req, res) => {
    try {
        const TLoans = await redisClient.get('ReadyLoan');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getReady();
        if (results.length > 0) {
            redisClient.set('ReadyLoan', JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'No approved Loans available' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.tloanStatusID = async (req, res) => {
    const { TLoanID } = req.params;
    try {
        const TLoans = await redisClient.get(`TLoanStatusID#${TLoanID}`);
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getStatusID(TLoanID);
        if (results.length > 0) {
            redisClient.set(`TLoanStatusID#${TLoanID}`, JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'Does not Exist!' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.allCurrent = async (req, res) => {
    try {
        const TLoans = await redisClient.get('AllCurrent');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.allCurrent();
        if (results.length > 0) {
            redisClient.set('AllCurrent', JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'Does not Exist!' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.allHistory = async (req, res) => {
    try {
        const TLoans = await redisClient.get('AllHistory');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.allHistory();
        if (results.length > 0) {
            redisClient.set('AllHistory', JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).json({ message: 'Does not Exist!' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateStatus = async (req, res) => {
    const { TLoanID } = req.params;
    const { statusChange } = req.body;
    try {
        const gettingInfo = await TLoan.getEmployeeInfo(TLoanID);
        const { UserID } = gettingInfo[0][0];
        const results = await TLoan.updateStatus(TLoanID, statusChange);
        const getManagerIDFromTLoan = await TLoan.getManagerIDFromTLoan(TLoanID);
        const { SalesManagerID } = getManagerIDFromTLoan[0][0];
        if (results) {
            if (statusChange === '5') {
                createNotification(21, UserID, TLoanID);
            } else if (statusChange === '6') {
                createNotification(22, UserID, TLoanID);
            } else if (statusChange === '7') {
                createNotification(23, UserID, TLoanID);
            }

            redisClient.del('ApprovedLoan');
            redisClient.del('PickingLoan');
            redisClient.del('ReadyLoan');
            redisClient.del(`TLoanItems#${TLoanID}`);
            redisClient.del(`TLoan#${TLoanID}`);
            redisClient.del(`TLoanIDs#${TLoanID}`);
            redisClient.del(`ManagerLoan#${SalesManagerID}`);
            redisClient.del(`ManagerExtension#${SalesManagerID}`);
            redisClient.del(`CurrentTLoan#${UserID}`);
            redisClient.del(`PendingTLoan#${UserID}`);
            redisClient.del(`DraftTLoan#${UserID}`);
            redisClient.del(`HistoryTLoan#${UserID}`);
            return res.status(200).json({ message: 'Status has been Updated' });
        }
        return res.status(400).json({ message: 'Status failed to Update' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getEmployeeInfo = async (req, res) => {
    const { TLoanID } = req.body;
    try {
        const results = await TLoan.getEmployeeInfo(TLoanID);
        if (results.length > 0) {
            return res.status(200).json(results[0][0].Email);
        }
        return res
            .status(404)
            .json({ message: 'Could not find the employee that created this TLoan!' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
