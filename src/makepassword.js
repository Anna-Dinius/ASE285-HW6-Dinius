'use strict';
const { readFile, writeFile, updateCreds } = require('./utility');

async function makepassword(passwordFileName, passwordEncFileName) {
	// Reach each line of the file and store it as an array of strings
	const creds = readFile(passwordFileName);

	// Hash the passwords, properly format the email and password pairs,
	// and add each pair to the MongoDB database
	const updatedCreds = await updateCreds(creds);

	// Write the updated credentials to an encrypted file
	writeFile(updatedCreds, passwordEncFileName);
}

if (require.main === module) {
	makepassword('./password.txt', './password.enc.txt');
}

module.exports = { makepassword };
