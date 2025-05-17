import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase.init';
import { db } from '../../firebase/firebase.init'; // Import Firestore
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore methods

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // Save additional user data (name, phone) to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: name,
        email: email,
        phone: phone,
        isBanned: false,  // Example field, add any other necessary fields
      });

      console.log('User registered and data saved to Firestore');
      
      // Redirect after successful registration
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-sweetPink flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl flex overflow-hidden max-w-5xl w-full">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-berryPink mb-6 mt-24">Create Account</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleRegister}
              className="w-full bg-berryPink hover:bg-sweetPink text-white font-semibold py-3 rounded-lg transition duration-200 mt-16"
            >
              Register
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://i.pinimg.com/736x/3d/d0/92/3dd0925c9d2c906f2a50b5528314542f.jpg"
            alt="Register"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
