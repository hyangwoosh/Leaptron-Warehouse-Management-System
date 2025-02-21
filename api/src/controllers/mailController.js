const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: 'manager@leaptron.com',
    from: 'sales@leaptron.com', // Use the email address or domain you verified above
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
};

/* eslint-disable no-console */

// send mail function

sgMail.send(msg).then(
    () => {},
    (error) => {
        console.error(error);

        if (error.response) {
            console.error(error.response.body);
        }
    }
);
// ES8
(async () => {
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body);
        }
    }
})();
