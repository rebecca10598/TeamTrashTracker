const admin = require('firebase-admin');

if (!admin.apps.length) 
{
    const serviceAccount = JSON.parse(
        Buffer.from(process.env.FIREBASE_ADMIN_KEY, 'base64').toString()
    );

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

module.exports = admin;

