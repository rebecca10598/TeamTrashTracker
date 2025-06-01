const User = require("../models/User");
const Pickup = require("../models/Pickup");

exports.getLeaderboard = async (req, res) => 
{
    try 
    {
        const users = await User.find();

        const leaderboard = await Promise.all(
        users.map(async (user) => {
            const pickupCount = await Pickup.countDocuments({ user: user._id });

            return {
            displayName: user.displayName,
            email: user.email,
            totalPoints: user.totalPoints,
            pickups: pickupCount,
            };
        })
        );

        // sort by total points descending
        leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

        res.json(leaderboard);
    } 
    catch (err) 
    {
        console.error("❌ Leaderboard error:", err);
        res.status(500).json({ message: "Server error ⚠️" });
    }
};
