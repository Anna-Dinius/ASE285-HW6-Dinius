'use strict';

const fs = require('fs');
const { createHash } = require('crypto');

function readFile(fileName) {
	if (!fs.existsSync(fileName)) {
		return false;
	}
	try {
		var text = fs.readFileSync(fileName).toString('utf-8');
		var textByLine = text.split('\n');
		return textByLine;
	} catch (err) {
		console.log(err);
	}
}

function writeFile(ar, fileName) {
	try {
		var res = ar.join('\n');
		fs.writeFileSync(fileName, res);
	} catch (err) {
		console.log(err);
	}
}

function hash(input) {
	return createHash('sha256').update(input).digest('hex'); // never use md5
}

// Hashes each password, formats the email and password pairs, and adds each pair to an array of strings
// Writes each pair to the MongoDB database
// Returns the array
const updateCreds = async (creds) => {
	var updatedCreds = [];
	console.log('creds:', creds);
	// Iterate through each email and password pair
	for (const credPair of creds) {
		// Split the pair into email and password
		const [email, password] = credPair.split(':');

		if (email && password) {
			// Hash the password
			const hashedPassword = hash(password.trim());

			// Set data for the API call
			const data = {
				email: email.trim(),
				password: hashedPassword,
			};

			// Call the API to write the email and hashed password to the MongoDB database
			try {
				const response = await fetch('http://localhost:5000/api/create-user', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});

				const result = await response.json();

				if (response.ok) {
					// Format the email and password pair and add it to the array
					updatedCreds.push(`${email.trim()}:${hashedPassword}`);
				}
			} catch (err) {
				console.error('Error: ', err.message);
			}
		}
	}
	return updatedCreds;
};

function checkCreds(filename, inputEmail, inputPassword) {
	var allCreds = readFile(filename);

	for (let credLine of allCreds) {
		const [email, password] = credLine.split(':');

		if (email && password) {
			if (
				inputEmail.trim() === email.trim() &&
				inputPassword.trim() === password.trim()
			) {
				return true;
			}
		}
	}

	return false;
}

module.exports = { readFile, writeFile, hash, updateCreds, checkCreds };
