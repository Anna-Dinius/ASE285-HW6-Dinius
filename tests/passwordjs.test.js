// Make tests when you have sub functions in this module.
// passwordjs() is tested by acceptance tests (acceptance.bat)

// Tests for utility functions

const u = require('../src/utility');
const { createHash } = require('crypto');

describe('testing utility functions', () => {
	test('test hash()', async () => {
		var password = 'password';
		const hashedPassword = u.hash(password);
		expect(password).not.toBe(hashedPassword);

		password = createHash('sha256').update(password).digest('hex');
		expect(password).toBe(hashedPassword);
	});

	test('test readFile()', async () => {
		// Test a file that doesn't exist
		var fileName = './tests/nonexistent.txt';

		expect(u.readFile(fileName)).toBe(false);

		// Test a file that does exist
		var fileName = './tests/passwordtest.txt';

		expect(u.readFile(fileName)).toStrictEqual([
			'sm.cho@hello.com:123456',
			'ae.dean@mail.com:654321',
		]);
	});

	test('test checkCreds()', async () => {
		var fileName = 'tests/passwordtest.txt';

		// Test with correct credentials
		var email = 'sm.cho@hello.com';
		var password = '123456';

		console.log('checkCreds result:', u.checkCreds(fileName, email, password));
		expect(u.checkCreds(fileName, email, password)).toBe(true);

		// Test with incorrect email and correct password
		email = 'cho.sm@hello.com';
		password = '123456';

		expect(u.checkCreds(fileName, email, password)).toBe(false);

		// Test with correct email and incorrect password
		email = 'sm.cho@hello.com';
		password = '654321';

		expect(u.checkCreds(fileName, email, password)).toBe(false);

		// Check with incorrect email and incorrect password
		email = 'cho.sm@hello.com';
		password = '654321';

		expect(u.checkCreds(fileName, email, password)).toBe(false);
	});
});
