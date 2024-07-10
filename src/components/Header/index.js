/*import React, { useEffect } from "react";
import './styles.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "../../firebase";
import { Firestore } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
function Header(){
    const [user, loading] = useAuthState(auth);
    const navigate=useNavigate();

    useEffect(()=>{
        if(user){
            Navigate('/dashboard');
        }
    },(user,loading));
    function logoutFnc(){
        try{
            signOut(auth).then(() => {
                // Sign-out successful.
                toast.success("Logged Out!")
                navigate("/")
              }).catch((error) => {
                toast.error(error.message);

              });

        }catch(e){
            toast.error(e.message);
        }
    }
    return <div className="navbar">
        <p className="logo">financly</p>
        <p className="link" onClick={logoutFnc}>Logout</p>
    </div>
}
export default Header;*/

import React, { useEffect } from "react";
import './styles.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "../../assets/user.svg"

function Header() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const logoutFnc = async () => {
        try {
            await signOut(auth);
            toast.success("Logged Out!");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="navbar">
            <p className="logo">financly</p>
            {user && (
                <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
                    <img src={user.photoURL ? user.photoURL:userImg}  style={{borderRadius:"50%", height:"2rem", width:"2rem"}}/>
                    <p className="logo link" onClick={logoutFnc}>
                        Logout
                    </p>
                    </div>
            )}
        </div>
    );
}

export default Header;
