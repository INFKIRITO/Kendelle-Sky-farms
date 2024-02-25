function isEmpty(value) {
    return !value || value.trim() === '';
}

function userCredentialsAreValid(email, password, minPasswordLength = 8) {
    const passwordString = typeof password === 'string' ? password : String(password);
    
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Password Length:', password.trim().length);
        return (
            email && 
            email.includes('@') && 
            password && 
            password.trim().length >= minPasswordLength
        );
    }


// Example usage:
// userCredentialsAreValid('test@example.com', 'password', 10); // Check for a minimum password length of 10


function userDetailsAreValid(email, password, name, street, postal, city) {
    return (
        userCredentialsAreValid(email,password) && 
        !isEmpty(name) &&
        !isEmpty(street) &&
        !isEmpty(postal) &&
        !isEmpty(city)  
    );
}

function emailIsConfirmed(email, confirmEmail) {
    return email === confirmEmail;
}

module.exports = {
    userDetailsAreValid: userDetailsAreValid,
    emailIsConfirmed: emailIsConfirmed
};