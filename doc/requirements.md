# Requirements/User Stories

- As a user, I should be able to create an account with an email and password.
- As a user, when I create an account, my password should be hashed for security.
- As a user, when I create an account, my email and encrypted password should be uploaded to the users collection of the MongoDB database.
- As a user, I should be able to upload a text file with multiple emails and their corresponding passwords to the users collection of the MongoDB database.
- As a user, when I upload a text file with multiple emails and their corresponding passwords to the users collection of the MongoDB database, the passwords should be hashed before being saved to the database.
- As a user, after I provide my email and password, I should receive feedback from the program in the form of 'true' or 'false' to indicate if i entered the correct email and password.
- As a user, if I enter the wrong email, the program should return false to let me know that authentication failed.
- As a user, if I enter the wrong password, the program should return false to let me know that authentication failed.
- As a user, if I enter the correct email and the wrong password, the program should return false to let me know that authentication failed.
- As a user, if I enter the wrong email and the correct password, the program should return false to let me know that authentication failed.
- As a user, if I enter the correct email and the correct password, the program should return true to let me know that authentication was successful.
- As a user, if I enter the an email that doesn't exist in the password file, the program should return false to let me know that authentication failed.
