// setRole.js (Using CommonJS)
const admin = require('firebase-admin');

// Load the service account key JSON file path from environment variable (optional)
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './cakezilla-86e16-firebase-adminsdk-fbsvc-95e7e38a0c.json';

// Import service account JSON
const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log('Firebase Admin SDK Initialized');

/**
 * Sets the custom claim 'role' to 'admin' for a user by their UID.
 * @param {string} uid - Firebase Auth User UID
 */
async function setAdminRole(uid) {
  try {
    await admin.auth().setCustomUserClaims(uid, { role: 'admin' });
    console.log(`Admin role set successfully for user: ${uid}`);
  } catch (error) {
    console.error('Error setting admin role:', error);
  }
}

// Example usage: set admin role for a specific user UID
setAdminRole('kUWiA9qeSpa9H8veW6I0xZehItn1');
