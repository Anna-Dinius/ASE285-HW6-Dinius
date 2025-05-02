# User Manual

Open a terminal in the root directory and run the following command to install all the dependencies:
`npm install`

---

Start the server by opening a terminal in the `/server` directory.
Run the following command to start the server:

`node server.js`

Alternatively, you can use nodemon if you have it installed:

`nodemon server.js `

---

The `.env` file contains the `MONGO_URI` variable necessary for accessing the database. It contains a username and password that were created specifically for reading and writing to the users collection of the ASE285-HW6 database on MongoDB.

---

If you want to upload multiple users to the MongoDB database at once, add them to the `password.txt` file with the proper format:

`email:password`

Then, open a terminal in the `/src` directory and run the following command:

`node makepassword.js password.txt password.enc.txt`

---

If you want to check an email/password pair against the encrypted file, open a terminal in the `/src` directory and run the following command:

`node passwordjs.js password.enc.txt email password`

Substitute `email` with the email you want to check and `password` with the email's corresponding password.

---

If you want to test the software's functionality, open a terminal in the root direcotry and run the following command:

`npm test`
