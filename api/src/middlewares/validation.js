const validator = require('validator');
const resetPasswordService = require('../services/resetPasswordService');

const validation = {
    validateLogin(req, res, next) {
        const { email, password } = req.body;

        const passswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/;
        if (password === '' || email === '') {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else if (passswordRegex.test(password) && validator.isEmail(email)) {
            next();
        } else if (!validator.isEmail(email)) {
            res.status(400).json({
                message: 'Please enter a valid email'
            });
        } else if (!passswordRegex.test(password)) {
            res.status(400).json({
                message: 'Please enter a valid password'
            });
        } else {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        }
    },

    validateUser: (req, res, next) => {
        const { name, email, password, mobileno, company, usergroup } = req.body;

        const passswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/;
        const phoneRegex = /^[6|8|9]\d{7}|\+65\s?[6|8|9]\d{7}|\(\+?65\)\s?[6|8|9]\d{7}$/;
        if (name === '' || email === '' || password === '' || mobileno === '') {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else if (company === null) {
            res.status(400).json({
                message: 'Please select the company the user belongs to'
            });
        } else if (usergroup === null) {
            res.status(400).json({
                message: 'Please select a user group to assign the user to'
            });
        } else if (
            passswordRegex.test(password) &&
            validator.isEmail(email) &&
            phoneRegex.test(mobileno)
        ) {
            next();
        } else if (!validator.isEmail(email)) {
            res.status(400).json({
                message: 'Please enter a valid email'
            });
        } else if (!passswordRegex.test(password)) {
            res.status(400).json({
                message: 'Please choose a stronger password'
            });
        } else if (!phoneRegex.test(mobileno)) {
            res.status(400).json({
                message: 'Please enter a valid phone number'
            });
        } else {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        }
    },

    validateUserUpdate: (req, res, next) => {
        const { name, email, password, mobileno, company, usergroup } = req.body;

        const passswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/;
        const phoneRegex = /^[6|8|9]\d{7}|\+65\s?[6|8|9]\d{7}|\(\+?65\)\s?[6|8|9]\d{7}$/;
        if (name === '' || email === '' || password === '' || mobileno === '') {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else if (company === null) {
            res.status(400).json({
                message: 'Please select the company the user belongs to'
            });
        } else if (usergroup === null) {
            res.status(400).json({
                message: 'Please select a user group to assign the user to'
            });
        } else if (
            password !== undefined &&
            passswordRegex.test(password) &&
            validator.isEmail(email) &&
            phoneRegex.test(mobileno)
        ) {
            next();
        } else if (
            // password is optional in case users choose default password - hence why it can be undefined
            password === undefined &&
            validator.isEmail(email) &&
            phoneRegex.test(mobileno)
        ) {
            next();
        } else if (!validator.isEmail(email)) {
            res.status(400).json({
                message: 'Please enter a valid email'
            });
        } else if (!passswordRegex.test(password)) {
            res.status(400).json({
                message: 'Please choose a stronger password'
            });
        } else if (!phoneRegex.test(mobileno)) {
            res.status(400).json({
                message: 'Please enter a valid phone number'
            });
        } else {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        }
    },

    validateMobileNo: (req, res, next) => {
        const { mobileno } = req.body;
        const phoneRegex = /^[6|8|9]\d{7}|\+65\s?[6|8|9]\d{7}|\(\+?65\)\s?[6|8|9]\d{7}$/;

        if (!phoneRegex.test(mobileno)) {
            res.status(400).json({
                message: 'Please enter a valid phone number'
            });
        } else {
            next();
        }
    },

    validate2FAToken: (req, res, next) => {
        const { mobileno } = req.query;
        const { code } = req.body;
        const phoneRegex = /^[6|8|9]\d{7}|\+65\s?[6|8|9]\d{7}|\(\+?65\)\s?[6|8|9]\d{7}$/;
        const tokenRegex = /^[0-9]{6}$/;

        if (!phoneRegex.test(mobileno)) {
            res.status(400).json({
                message: 'Please enter a valid phone number'
            });
        } else if (!tokenRegex.test(code)) {
            res.status(400).json({
                message: 'Please enter a valid code'
            });
        } else {
            next();
        }
    },

    validateUserGroup: (req, res, next) => {
        const { name, description } = req.body;

        if (name === '' || description === '') {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else {
            next();
        }
    },

    validateNotificationGroup: (req, res, next) => {
        const { name, description, company } = req.body;

        if (name === '' || description === '') {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else if (company === null) {
            res.status(400).json({
                message: 'Please select a company to assign the notification group to'
            });
        } else {
            next();
        }
    },

    validateLoan: (req, res, next) => {
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
        const today = new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000);
        const yyyy = today.getFullYear();
        let mm = (today.getMonth() + 1).toString(); // Months start at 0!
        let dd = today.getDate().toString();

        if (parseInt(dd, 10) < 10) dd = `0${dd}`;
        if (parseInt(mm, 10) < 10) mm = `0${mm}`;

        const formattedToday = `${yyyy}-${mm}-${dd}`.toString();

        if (
            type === '' ||
            email === '' ||
            name === '' ||
            purpose === '' ||
            company === '' ||
            applicationdate === '' ||
            duration === '' ||
            requireddate === '' ||
            requireddate < formattedToday === true ||
            user === '' ||
            collection === '' ||
            shipping === '' ||
            (type === '2' &&
                (company === '1' ||
                    company === '2' ||
                    company === '3' ||
                    company === '4' ||
                    company === '5' ||
                    company === '6')) ||
            (type === '1' &&
                company !== '1' &&
                company !== '2' &&
                company !== '3' &&
                company !== '4' &&
                company !== '5' &&
                company !== '6') ||
            items === []
        ) {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else if (validator.isEmail(email)) {
            next();
        } else if (!validator.isEmail(email)) {
            res.status(400).json({
                message: 'Please enter a valid email'
            });
        } else {
            next();
        }
    },

    validatePassword(req, res, next) {
        const { password } = req.body;

        const passswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/;

        if (passswordRegex.test(password)) {
            next();
        } else {
            res.status(400).json({
                message: 'Please enter a valid password'
            });
        }
    },

    validateDraft: (req, res, next) => {
        const { type, company, email, requireddate, items } = req.body;
        const today = new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000);
        const yyyy = today.getFullYear();
        let mm = (today.getMonth() + 1).toString(); // Months start at 0!
        let dd = today.getDate().toString();
        if (parseInt(dd, 10) < 10) dd = `0${dd}`;
        if (parseInt(mm, 10) < 10) mm = `0${mm}`;
        const formattedToday = `${yyyy}-${mm}-${dd}`.toString();

        if (
            email === '' ||
            company === '' ||
            (type === '2' &&
                (company === '1' ||
                    company === '2' ||
                    company === '3' ||
                    company === '4' ||
                    company === '5' ||
                    company === '6')) ||
            (type === '1' &&
                company !== '1' &&
                company !== '2' &&
                company !== '3' &&
                company !== '4' &&
                company !== '5' &&
                company !== '6') ||
            requireddate < formattedToday === true ||
            items === []
        ) {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else if (validator.isEmail(email)) {
            next();
        } else if (!validator.isEmail(email)) {
            res.status(400).json({
                message: 'Please enter a valid email'
            });
        } else {
            next();
        }
    },

    validateExtensionRequest: (req, res, next) => {
        const { reason, duration } = req.body;

        if (reason === '' || duration === '') {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else {
            next();
        }
    },
    validateRejectRemark: (req, res, next) => {
        const { remarks } = req.body;

        if (remarks === '') {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else {
            next();
        }
    },

    validateStatusUpdate: (req, res, next) => {
        const { statusChange } = req.body;

        if (statusChange === '') {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else {
            next();
        }
    },

    validateRmaSubmission: (req, res, next) => {
        const { contactperson, contactno, salesmanid, contactemail, company, products } = req.body;
        if (products.length === 0) {
            res.status(400).json({
                message: 'Please add at least 1 product to the table'
            });
        } else if (
            contactperson === '' &&
            contactno === '' &&
            salesmanid === '' &&
            contactemail === '' &&
            company === ''
        ) {
            res.status(400).json({
                message: 'Please fill in the form fields'
            });
        } else if (contactperson === '') {
            res.status(400).json({
                message: 'Please enter the customer name'
            });
        } else if (contactemail === '') {
            res.status(400).json({
                message: 'Please enter the customer email'
            });
        } else if (company === '') {
            res.status(400).json({
                message: 'Please enter the customer contact number'
            });
        } else if (contactno === '') {
            res.status(400).json({
                message: 'Please enter the customer company'
            });
        } else {
            next();
        }
    },

    validateRmaInstruction: (req, res, next) => {
        const { products } = req.body;
        products.map((product) => {
            if (product.Instructions === '') {
                return res.status(400).json({
                    message: 'Please provide instructions for each product!'
                });
            }
            return next();
        });
    },

    validateRmaCOA: (req, res, next) => {
        const { products } = req.body;
        products.map((product) => {
            if (product.CourseOfAction === '') {
                return res.status(400).json({
                    message: 'Please provide an update to the course of action for each product!'
                });
            }
            return next();
        });
    },

    // Reset token validation
    validateResetToken: async (req, res, next) => {
        const { email } = req.body;
        const resetToken = req.body.token;

        if (!email) {
            return res.status(400).json({
                message: 'Email not keyed in.'
            });
        }

        if (!resetToken) {
            return res.status(400).json({
                message: 'Token does not exist. Please generate a new one.'
            });
        }

        // Verify if token exists in the resetPasswordToken and not expired.
        const currentTime = new Date(Date.now());

        const token = await resetPasswordService.findValidToken(resetToken, email, currentTime);

        if (token[0].length > 0) {
            return next();
        }
        return res.status(401).json({
            message: 'Invalid token, please generate a new one.'
        });
    }
};

module.exports = validation;
