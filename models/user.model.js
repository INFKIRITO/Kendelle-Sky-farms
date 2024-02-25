
const bcrypt = require('bcryptjs');

const db = require('../data/database');

class User {
    constructor(email, password, fullname, street, postal, city) {
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city: city
        };
    }

    getUserWithSameEmail() {
        return db.getDb().collection('users').findOne({email: this.email });
    }

    async existsAlready() {
        try {
            const existingUser = await this.getUserWithSameEmail();
            if (existingUser) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error checking if user exists:', error);
            throw error; // Rethrow the error to be caught in the catch block outside this function.
        }
    }

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword, //? do not store as plain text sol - use hashing 
            name: this.name,
            address: this.address
        });
     }

     hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword);
     }
}

module.exports = User
