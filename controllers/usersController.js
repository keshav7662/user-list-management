const User = require('../models/User');
const List = require('../models/List');
const csvHandler = require('../utils/csvHandler');
const emailSender = require('../utils/emailSender');

exports.uploadUsers = async (req, res) => {
    const { listId } = req.params;
    const file = req.file;
    console.log("file",file)
    try {
        const list = await List.findById(listId);
        if (!list) return res.status(404).json({ error: 'List not found' });

        const { addedUsers, failedUsers, totalUsers, errors } = await csvHandler.handleCSV(file, list);
        res.status(200).json({ addedUsers, failedUsers, totalUsers, errors });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

exports.sendEmailToList = async (req, res) => {
    const { listId } = req.params;
    const { subject, body } = req.body;
    console.log(process.env.EMAIL)
    console.log(process.env.EMAIL_PASSWORD)
  
    try {
        const users = await User.find({ list: listId, unsubscribed: false });
        const emails = users.map(user => user.email);
        const emailPromises = emails.map(email => emailSender.sendEmail(email, subject, body));

        await Promise.all(emailPromises);
        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

exports.unsubscribeUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndUpdate(userId, { unsubscribed: true }, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ message: 'User unsubscribed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
