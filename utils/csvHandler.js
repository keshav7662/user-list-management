const csv = require('csv-parser');
const User = require('../models/User');
const { Readable } = require('stream');

exports.handleCSV = async (file, list) => {
    const users = [];
    const errors = [];
    const customPropertiesMap = new Map(list.customProperties.map(prop => [prop.title, prop.defaultValue]));

    return new Promise((resolve, reject) => {
        const readableStream = new Readable();
        readableStream._read = () => { }; 
        readableStream.push(file.buffer);
        readableStream.push(null);

        readableStream
            .pipe(csv())
            .on('data', (row) => {
                const { name, email, ...properties } = row;
                if (!name || !email) {
                    errors.push({ row, error: 'Missing required fields' });
                    return;
                }

                const userProperties = new Map();
                for (const [key, value] of Object.entries(properties)) {
                    userProperties.set(key, value || customPropertiesMap.get(key));
                }

                users.push({ name, email, list: list._id, properties: userProperties });
            })
            .on('end', async () => {
                let addedUsers = 0;
                let failedUsers = 0;

                for (const user of users) {
                    try {
                        await new User(user).save();
                        addedUsers++;
                    } catch (error) {
                        errors.push({ user, error: error.message });
                        failedUsers++;
                    }
                }

                const totalUsers = await User.countDocuments({ list: list._id });
                resolve({ addedUsers, failedUsers, totalUsers, errors });
            })
            .on('error', reject);
    });
};
