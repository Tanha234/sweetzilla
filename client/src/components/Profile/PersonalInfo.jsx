import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase.init';
import { updateProfile, updateEmail } from 'firebase/auth';

export default function PersonalInfo() {
  const user = auth.currentUser;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.displayName || '',
        email: user.email || '',
        phone: '', // Fetch from Firestore if you're saving phone
        dob: '',
        gender: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      if (user) {
        await updateProfile(user, { displayName: formData.fullName });
        // Optional: update email (may require re-authentication)
        // await updateEmail(user, formData.email);

        alert('Profile updated!');
        setEditMode(false);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <button
          onClick={() => setEditMode((prev) => !prev)}
          className="text-sm text-blue-600 hover:underline"
        >
          {editMode ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={!editMode}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            name="email"
            value={formData.email}
            disabled
            className="mt-1 w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editMode}
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="Optional"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            disabled={!editMode}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium">Gender (optional)</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={!editMode}
            className="mt-1 w-full border rounded px-3 py-2"
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      {editMode && (
        <div>
          <button
            onClick={handleSave}
            className="bg-berryPink text-white px-4 py-2 rounded shadow"
          >
            Save Changes
          </button>
        </div>
      )}

     
    </div>
  );
}
