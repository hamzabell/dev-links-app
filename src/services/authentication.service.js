import fs from './firebase.service';
import bcrypt from 'bcryptjs';

export default () => {
    const tableName = 'User';
    async function login({ email, password }) {
        const user = await fs(tableName).getByForeignKey('email', email);

        if (!user || user.length == 0) {
            return Promise.reject("User does not exist!");
        }


        if ( await bcrypt.compare(password, user[0].password)) {
            return Promise.resolve(user[0]);
        }

        return Promise.reject("Wrong Email/Password");
    }

    async function createAccount({ email, password, confirmPassword }) {
        const otherUserWithEmail = await fs(tableName).getByForeignKey('email', email);

        if (otherUserWithEmail.length > 0) {
            return Promise.reject('Email already in use!');
        }

        if (password !== confirmPassword) {
            return Promise.reject('Passwords do not match!')
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await fs(tableName).create({ email, password: hashedPassword });
        } catch (err) {
            return Promise.reject(err);
        }

        return Promise.resolve(true);

    }

    return {
        login,
        createAccount
    }
}