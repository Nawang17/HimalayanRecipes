import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
        console.log(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setLoading(false); // Set loading to false once the auth state is determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { isLoggedIn, user, loading };
};

export default useAuth;
