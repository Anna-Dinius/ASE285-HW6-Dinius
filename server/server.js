require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const User = require('./schemas/User.schema');

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('Error connecting to MongoDB:', err));

const app = express();
app.use(express.json());

app.post('/api/create-user', async (req, res) => {
	try {
		const { email, password } = req.body;
		const newUser = new User({ email, password });

		const savedUser = await newUser.save();
		if (savedUser) {
			return res.status(201).json({ message: 'User created successfully' });
		}

		return res.status(400).json({ error: 'Could not create user' });
	} catch (err) {
		res.status(400).json({ error: 'An error occured' });
	}
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
