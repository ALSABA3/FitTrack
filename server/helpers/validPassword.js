module.exports = function isValidPassword(password) {
   
    const hasLowerCase = /[a-z]/;
    const hasUpperCase = /[A-Z]/;
    const hasDigit = /\d/;
    const hasNoSpaces = /^\S*$/; 
    const isValidLength = /^.{8,}$/; 

    
    if (!isValidLength.test(password)) {
        return "Password must be at least 8 characters long.";
    }
    if (!hasLowerCase.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }
    if (!hasUpperCase.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!hasDigit.test(password)) {
        return "Password must contain at least one digit.";
    }
    if (!hasNoSpaces.test(password)) {
        return "Password must not contain spaces.";
    }

    
    return true;
}


