const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const listRoutes = require('./routes/list');
const userRoutes = require('./routes/user');

app.get('/health', (req, res) => {
    res.json({
        serverName: 'user-list-management',
        currentTime: new Date(),
        state: 'active',
    });
});

app.use('/api/lists', listRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

