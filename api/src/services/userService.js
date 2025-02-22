const knex = require('../config/database');

module.exports.getByEmail = async (email) => {
    // return knex.where('Email', email).select('UserID','Username','Password').from('User')
    const query = `SELECT DISTINCT u.Active, u.UserID, u.Username, u.Password, g.UserGroupName, g.UserGroupID, u.2FA 'Enabled2FA', u.MobileNo, u.TelegramID, count(n.NotificationID) OVER() AS "Unreadnotifications" FROM User u LEFT JOIN UserGroup g ON u.UserGroupID = g.UserGroupID LEFT JOIN Notification n ON n.ReceiverID = u.UserID AND n.Read = 0 WHERE u.Email = ?`;
    return knex.raw(query, [email]);
};

module.exports.getNames = async (name) => {
    const query = `SELECT DISTINCT IFNULL(Username, NULL) 'Name' FROM User WHERE Username LIKE ?`;
    return knex.raw(query, [`%${name}%`]);
};

module.exports.filter = async (pageSize, pageNo, sortColumn, sortOrder, name) => {
    const query = `Call sp_getAllUsers(?,?,?,?,?)`;
    return knex.raw(query, [Number(pageSize), Number(pageNo), sortColumn, sortOrder, name]);
};

module.exports.getAll = async () => {
    const query = `SELECT u.UserID, u.Username, u.Email, c.CompanyName, g.UserGroupName, IFNULL(u.MobileNo, 'NULL') 'MobileNo' FROM User u LEFT JOIN Company c ON u.CompanyID = c.CompanyID LEFT JOIN UserGroup g ON u.UserGroupID = g.UserGroupID`;
    return knex.raw(query);
};

module.exports.getByID = async (userID) => {
    const query = `SELECT u.Active, u.Username, u.Email, c.CompanyName, c.CompanyID, g.UserGroupName, g.UserGroupID, IFNULL(u.MobileNo, 'NULL') 'MobileNo'  FROM User u LEFT JOIN Company c ON u.CompanyID = c.CompanyID LEFT JOIN UserGroup g ON u.UserGroupID = g.UserGroupID WHERE u.UserID = ?`;
    return knex.raw(query, [userID]);
};

module.exports.getByName = async (name) => {
    const query = `SELECT u.UserID, u.Username, u.Email, c.CompanyName, g.UserGroupName, IFNULL(u.MobileNo, 'NULL') 'MobileNo'  FROM User u LEFT JOIN Company c ON u.CompanyID = c.CompanyID LEFT JOIN UserGroup g ON u.UserGroupID = g.UserGroupID WHERE u.Username LIKE ?`;
    return knex.raw(query, [`%${name}%`]);
};

module.exports.insert = async (name, email, password, mobileno, company, usergroup, notigroups) => {
    /*
    return knex('User').insert({
        Username: name,
        Email: email,
        Password: password,
        MobileNo: mobileno,
        CompanyID: company,
        UserGroupID: usergroup,
        Active: 'Y'
    });
    */
    return knex.transaction((trx) => {
        knex.insert(
            {
                Username: name,
                Email: email,
                Password: password,
                MobileNo: mobileno,
                CompanyID: company,
                UserGroupID: usergroup,
                Active: 'Y'
            },
            'UserID'
        )
            .into('User')
            .transacting(trx)
            .then((ids) => {
                if (notigroups.length > 0) {
                    notigroups.forEach((notigroup) => {
                        [notigroup.UserID] = ids; // eslint-disable-line no-param-reassign
                    });
                    return knex('UserNotiGroup').insert(notigroups).transacting(trx);
                }
                return null;
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.update = async (
    userID,
    name,
    email,
    password,
    mobileno,
    company,
    usergroup,
    active,
    notigroups
) => {
    return knex.transaction((trx) => {
        knex('User')
            .where('UserID', userID)
            .update({
                Username: name,
                Email: email,
                Password: password,
                MobileNo: mobileno,
                CompanyID: company,
                UserGroupID: usergroup,
                Active: active
            })
            .transacting(trx)
            .then(() => {
                return knex('UserNotiGroup').where('UserID', userID).del().transacting(trx);
            })
            .then(() => {
                if (notigroups.length > 0) {
                    notigroups.forEach((notigroup) => {
                        notigroup.UserID = userID; // eslint-disable-line no-param-reassign
                    });
                    return knex('UserNotiGroup').insert(notigroups).transacting(trx);
                }
                return null;
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateWithoutPassword = async (
    userID,
    name,
    email,
    mobileno,
    company,
    usergroup,
    active,
    notigroups
) => {
    return knex.transaction((trx) => {
        knex('User')
            .where('UserID', userID)
            .update({
                Username: name,
                Email: email,
                MobileNo: mobileno,
                CompanyID: company,
                UserGroupID: usergroup,
                Active: active
            })
            .transacting(trx)
            .then(() => {
                return knex('UserNotiGroup').where('UserID', userID).del().transacting(trx);
            })
            .then(() => {
                if (notigroups.length > 0) {
                    notigroups.forEach((notigroup) => {
                        notigroup.UserID = userID; // eslint-disable-line no-param-reassign
                    });
                    return knex('UserNotiGroup').insert(notigroups).transacting(trx);
                }
                return null;
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.update2FA = async (userID, return2FA) => {
    /*
    return knex('User').where('UserID', userID).update({
        Username: name,
        Email: email,
        Password: password,
        MobileNo: mobileno,
        CompanyID: company,
        UserGroupID: usergroup,
        Active: active
    });
    */
    return knex('User').where('UserID', userID).update({
        '2FA': return2FA
    });
};

module.exports.getByUserGroup = async (userGroupID) => {
    const query = `SELECT Count(UserID) 'Count' FROM User WHERE UserGroupID = ?`;
    return knex.raw(query, [userGroupID]);
};

module.exports.getByNotificationGroup = async (notiGroupID) => {
    const query = `SELECT Count(UserID) 'Count' FROM UserNotiGroup WHERE NotiGroupID = ?`;
    return knex.raw(query, [notiGroupID]);
};

module.exports.checkTLoansAndRMA = async (userID) => {
    const query = `SELECT Count(UserID) 'Count' FROM (SELECT UserID FROM TLoan WHERE UserID = ? UNION SELECT SalesmanID 'UserID' FROM Rma WHERE SalesmanID = ?) AS T`;
    return knex.raw(query, [userID, userID]);
};

module.exports.delete = async (userID) => {
    return knex('User').where('UserID', userID).del();
};

module.exports.updatePassword = async (password, id) => {
    return knex('User').where('UserID', id).update({
        Password: password
    });
};

module.exports.updateTeleID = async (userID, telegramid) => {
    return knex('User').where('UserID', userID).update({
        TelegramID: telegramid
    });
};

module.exports.getLastID = async () => {
    const query = `SELECT UserID FROM User ORDER BY UserID DESC LIMIT 1`;
    return knex.raw(query);
};
