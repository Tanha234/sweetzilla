import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';


const useUserRole = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        setUserRole(idTokenResult.claims.role || 'user'); // fallback to 'user' if undefined
      } else {
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userRole;
};

export default useUserRole;
