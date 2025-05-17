const admin = require('firebase-admin');
const serviceAccount = require('../cakezilla-86e16-firebase-adminsdk-fbsvc-95e7e38a0c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
