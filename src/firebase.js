import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
         getAuth,
         signInWithEmailAndPassword,
         signOut} from "firebase/auth"
import { addDoc,
     collection, 
     getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBrARNBjxnNiA3rtwv95k7V8zAWsWexWps",
  authDomain: "netflix-clone-26a3a.firebaseapp.com",
  projectId: "netflix-clone-26a3a",
  storageBucket: "netflix-clone-26a3a.firebasestorage.app",
  messagingSenderId: "786794260209",
  appId: "1:786794260209:web:fcfb9a18b810f864a52b50"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup =async(name,email,password)=>{
try{
   const res= await createUserWithEmailAndPassword(auth,email,password);
   const user = res.user;
   await addDoc(collection(db,"user"),{
    uid:user.uid,
    name,
    authProvider:"local",
    email,
   })
}
catch (error){
console.log(error);
toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const login= async(email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = () => {
  return signOut(auth);
};

export { auth, db, login, signup, logout };
