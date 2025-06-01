const Pickup = require("../models/Pickup");
const User = require("../models/User");

// POST /api/pickups (create a pickup)
exports.createPickup = async (req, res) => 
{
    const { lat, lng, image } = req.body;

    try 
    {
        const user = await User.findOne({ authId: req.user.uid });
        if (!user) return res.status(404).json({ message: "User was not found❗" });

        // create pickup instance
        const newPickup = new Pickup
        ({
            user: user._id,
            location: { lat, lng },
            image,
            points: 10,
        });

        await newPickup.save();

        // update user points
        user.totalPoints += newPickup.points;

        // badge logic
        const pickupCount = await Pickup.countDocuments({ user: user._id });
        const existingBadges = user.badges || [];

        if (!existingBadges.includes("first_pickup") && pickupCount === 1) 
        {
            user.badges.push("first_pickup");
        }

        if (!existingBadges.includes("ten_pickups") && pickupCount === 10) 
        {
            user.badges.push("ten_pickups");
        }

        // sri Lanka time zone streak logic 
        const offsetMinutes = 330;

        const toLocalDateString = (d) =>
        new Date(d.getTime() + offsetMinutes * 60000).toISOString().slice(0, 10); // yyyy-mm-dd

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const todayStr = toLocalDateString(today);
        const yesterdayStr = toLocalDateString(yesterday);
        const lastStr = user.lastPickupAt ? toLocalDateString(new Date(user.lastPickupAt)) : null;

        // streak calculation
        if (lastStr === todayStr) 
        {
            // no change to streak - already picked up today
        } 
        else if (lastStr === yesterdayStr) 
        {
            user.currentStreak += 1;
        } 
        else 
        {
            user.currentStreak = 1;
        }

        // update streak meta
        user.lastPickupAt = today;

        if (user.currentStreak > (user.longestStreak || 0)) 
        {
            user.longestStreak = user.currentStreak;
        }

        console.log("🔥Streak Updated:", 
        {
            currentStreak: user.currentStreak,
            lastPickupAt: user.lastPickupAt,
        });

        await user.save(); // save user updates

        res.status(201).json
        ({
            pickup: newPickup,
            currentStreak: user.currentStreak,
            lastPickupAt: user.lastPickupAt,
            longestStreak: user.longestStreak,
        });

    } 
    catch (err) 
    {
        console.error("❌ Error creating pickup:", err);
        res.status(500).json({ message: "Server error ⚠️" });
    }
};

// GET /api/pickups (list all pickups with user info)
exports.getPickups = async (req, res) => 
{
    try {
        const pickups = await Pickup.find().populate("user", "displayName email");
        res.json(pickups);
    } catch (err) {
        console.error("❌ Error fetching pickups:", err);
        res.status(500).json({ message: "Server error ⚠️" });
    }
};
