function isInvalidEmail(userObject) { 
    return !userObject.email.includes('@');
}

function isEmptyPayload(userObject) {
    return !userObject.name || !userObject.email || !userObject.interests;
}

module.exports = {
    isInvalidEmail, 
    isEmptyPayload
};