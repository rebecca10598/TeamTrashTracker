const User = require('../models/User');

exports.getOrCreateUser = async (req, res) => 
{
    const { uid, name, email } = req.user;

    try 
    {
        let user = await User.findOne({ authId: uid });

        if (!user) 
        {
            user = await User.create({
                authId: uid,
                displayName: name,
                email
            });
        }

        res.json(user);
    } 
    catch (err) 
    {
        console.error(err);
        res.status(500).send('Server error ⚠️');
    }
};
