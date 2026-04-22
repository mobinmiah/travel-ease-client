import { useEffect, useState, useCallback } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://travel-ease-server-pi.vercel.app";
const ACCESS_TOKEN_KEY = "access-token";

const googleProvider = new GoogleAuthProvider();
const plainAxios = axios.create({ baseURL: API_BASE_URL });

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDbUser = useCallback(async (firebaseUser) => {
    if (!firebaseUser?.email) { setDbUser(null); return; }

    let token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      try {
        const { data } = await plainAxios.post("/jwt", { email: firebaseUser.email });
        token = data.token;
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
      } catch {
        setDbUser(null);
        return;
      }
    }

    try {
      const { data } = await plainAxios.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDbUser(data);
    } catch {
      setDbUser(null);
    }
  }, []);

  const googleSignIn  = () => { setLoading(true); return signInWithPopup(auth, googleProvider); };
  const createUser    = (email, password) => { setLoading(true); return createUserWithEmailAndPassword(auth, email, password); };
  const logInUser     = (email, password) => { setLoading(true); return signInWithEmailAndPassword(auth, email, password); };
  const updateUserInfo = (name, photo)    => { setLoading(true); return updateProfile(auth.currentUser, { displayName: name, photoURL: photo }); };

  const logOutUser = () => {
    setLoading(true);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setDbUser(null);
    return signOut(auth);
  };

  const refreshDbUser = useCallback(() => fetchDbUser(auth.currentUser), [fetchDbUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) await fetchDbUser(currentUser);
      else setDbUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [fetchDbUser]);

  const authInfo = {
    user, dbUser, role: dbUser?.role ?? null,
    setUser, loading, setLoading,
    googleSignIn, createUser, logInUser, updateUserInfo, logOutUser, refreshDbUser,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProviders;
