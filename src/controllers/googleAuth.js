const googleAuth = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({
            status: "error",
            message: "Not authorized",
            data: "Unauthorized",
        });
    }

    res.header("AuthToken", user.token);
};
module.exports = googleAuth;
