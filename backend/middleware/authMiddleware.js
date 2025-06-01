const admin = require("../utils/firebase");

module.exports = async function (req, res, next) 
{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) 
    {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const idToken = authHeader.split(" ")[1];

    try 
    {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } 
    catch (err) 
    {
        console.error("Firebase token error:", err.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};
