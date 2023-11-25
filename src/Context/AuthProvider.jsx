import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "../../firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {

	const [user, setUser] = useState(null);


	const SignUp = (email, pass) => {
		return createUserWithEmailAndPassword(auth, email, pass);
	};

	const SignIN = (email, pass) => {
		return signInWithEmailAndPassword(auth, email, pass);
	};

    const profile = (displayName, PhotoUrl) => {
		return updateProfile(auth.currentUser, {
			displayName: displayName,
			photoURL: PhotoUrl,
		});
	};

    
	const logOut = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
			});
	};

    useEffect(() => {


        const unsubscribe =  onAuthStateChanged(auth , user => {
                if(user){
                    console.log(user) 
                    setUser(user)
                           }
                else{
                    console.log("user is signed Out");
                    setUser(null)
                }
            })
    
    
            return () => {
                return unsubscribe
            }
        },[])

	const authObj = {
		user , SignIN , SignUp , profile , logOut
	};

	return (
		<AuthContext.Provider value={authObj}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
