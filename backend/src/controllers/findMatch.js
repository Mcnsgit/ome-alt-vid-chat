const { User } = require("../models/UserSchema");

function findMatch(activeUser) {
    const filteredPassiveUsers = passiveUsers.filter(user => {
        return (user.gender === activeUser.preferredGender || activeUser.preferredGender === 'any') &&
               user.interests.some(interest => activeUser.interests.includes(interest));
    });

    if (filteredPassiveUsers.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredPassiveUsers.length);
        return filteredPassiveUsers[randomIndex]; // Return a random matching user
    }
    return null; // No match found
}

export default findMatch;
