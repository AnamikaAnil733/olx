import { createContext, useEffect, useState, useContext } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { FirebaseContext } from './FireContext';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { auth, app } = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    const db = getFirestore(app);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser({ uid: currentUser.uid, ...docSnap.data() });
        } else {
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName ,
          });
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth, app]);

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
