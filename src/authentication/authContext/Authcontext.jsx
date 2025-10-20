import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect,useState , useContext} from 'react'
import { createContext } from 'react'
import { auth } from '../../firebase/firebase'
import { collection, } from 'firebase/firestore'

const Authcontext = createContext()

export function useAuth(){
    return useContext(Authcontext)
}
function AuthProvider({children}) {  
    const [currentUser,setCurrentUser] = useState(null)
    const [userLoggedIn,setUserLoggedIn] = useState(false)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,initializeuser)

        return unsubscribe ;
    },[])
    
    async function initializeuser(user){
         if(user){
            setCurrentUser(user);
            setUserLoggedIn(true);
         }
         else{
            setCurrentUser(null);
            setUserLoggedIn(false);
         }
         setLoading(false)
         
    }
    const value = {
        currentUser,
        userLoggedIn,
        loading
    }
  return (
    <Authcontext.Provider value={value}>
        {!loading && children}
    </Authcontext.Provider>
  )
}

export default AuthProvider