import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase.init';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const idTokenResult = await user.getIdTokenResult();
      if (idTokenResult.claims.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-sweetPink flex py-4 justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl flex overflow-hidden max-w-5xl w-full">
        {/* Image on the left */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://i.pinimg.com/736x/6a/82/2b/6a822b8110fbc68532cc30fe43fe02a9.jpg"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form on the right */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-berryPink mt-16 mb-6">Login</h2>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-berryPink hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Login
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don&apos;t have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
