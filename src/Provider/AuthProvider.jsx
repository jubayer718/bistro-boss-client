import { GoogleAuthProvider,createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import userAxiosPublic from "../Hooks/userAxiosPublic";


export const authContext=createContext(null)
const AuthProvider = ({ children }) => {
  const [user,setUser]=useState([])
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const axiosPublic= userAxiosPublic()
  const updateUserProfile = (name,photo) => {
   return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo
})
  }
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password)
  }
  const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth,provider)
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
      if (currentUser) {
        //  get token and store client side
        const userInfo={email:currentUser.email}
        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token);
                 setLoading(false)
          }
        })
      } else {
        // remove token from client 
        localStorage.removeItem('access-token')
        setLoading(false)
      }
    })
    return () => {
      unsubscribe()
    }
 },[axiosPublic])
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    handleSignOut,
    updateUserProfile,
    googleSignIn
  }

  return (
    <authContext.Provider value={authInfo}>
      { children}
    </authContext.Provider>
  )
};

export default AuthProvider;