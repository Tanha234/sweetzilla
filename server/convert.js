const fs = require('fs');

// Read your Firebase service account file
const json = fs.readFileSync('./cakezilla-86e16-firebase-adminsdk-fbsvc-95e7e38a0c.json', 'utf-8');

// Convert it to Base64
const base64 = Buffer.from(json).toString('base64');

// Print the result
console.log(base64);
