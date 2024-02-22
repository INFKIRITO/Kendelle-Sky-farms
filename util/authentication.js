function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    req.session.save((err) => {
        if (err) {
            console.error('Error saving session:', err);
        } else {
            action();
        }
    });
}
function destoryUserAuthSession(req){
    req.session.uid = null;
}


module.exports = {
    createUserSession: createUserSession,
    destoryUserAuthSession:destoryUserAuthSession
};
