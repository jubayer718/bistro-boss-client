import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";

export const authContext=createContext(null)
const AuthProvider = ({ children }) => {
  const [user,setUser]=useState([])
  const [loading, setLoading] = useState(true);

  const updateUserProfile = (name,photo) => {
   return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo
})
  }
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password)
  }
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password)
}
  const handleSignOut = () => {
    setLoading(true);
    return signOut(auth)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      console.log('current user:', currentUser);
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
 },[])
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    handleSignOut,
    updateUserProfile
  }

  return (
    <authContext.Provider value={authInfo}>
      { children}
    </authContext.Provider>
  )
};

export default AuthProvider;