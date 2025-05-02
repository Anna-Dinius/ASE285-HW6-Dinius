// To unit-test the function that generates 'password.enc.txt', you should
//  make sure the unit test does the following check.
// 1. Make sure password.enc.txt does not exist before running the function.
// 2. Make sure password.enc.txt does exist after running the function.
// 3. Make sure the contents of password.enc.txt has correct contents.
// For unit tests, you don't have to have a large input in the beginning.
// Start with smallest input, and add more contents in the input

const { makepassword } = require('../src/makepassword');
const u = require('../src/utility');
const fs = require('fs');

// Tests for makepassword function

describe('makepassword should create file', () => {
	test('test file creation', async () => {
		const fileName = './tests/passwordtest.txt';
		const encFileName = './tests/passwordtest.enc.txt';

		// Remove the encrypted file if it already exists
		if (fs.existsSync(encFileName)) {
			fs.unlinkSync(encFileName);
		}

		// 1. Make sure password.enc.txt does not exist before running the function.
		expect(fs.existsSync(encFileName)).toBe(false);

		await makepassword(fileName, encFileName);

		// 2. Make sure password.enc.txt does exist after running the function.
		expect(fs.existsSync(encFileName)).toBe(true);

		// 3. Make sure the contents of password.enc.txt has correct contents.
		const creds = u.readFile(fileName);
		var updatedCreds = await u.updateCreds(creds);
		updatedCreds = updatedCreds.sort();
		const encCreds = u.readFile(encFileName).sort();

		expect(updatedCreds.length).toBe(encCreds.length);
		expect(JSON.stringify(updatedCreds)).toBe(JSON.stringify(encCreds));
	});
});
