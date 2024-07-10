/*import React,{useState} from "react";
import "./styles.css"
import Input from "../Input";
import Button from "../Button";
import { confirmPasswordReset, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
// import { toast } from "react-toastify";

import { toast } from "react-toastify";
function SignUpinComponent(){
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,setLoading]=useState("");
  function signupWithEmail(){
    setLoading(true);
    console.log("Name",name);
    console.log("Email",email);
    if(name!="" && email!="" && password!="" && confirmPassword!=""){
         if(password==confirmPassword){
            createUserWithEmailAndPassword(auth,email,password)
            .then((userCredential) => {
    // Signed up 
            const user = userCredential.user;
             console.log("User>>>",user);
            toast.success("User Created!");
    // ...
            });
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage);
                setLoading(false);
    // ..
            });
          }else{
            toast.error("Password and Confirm Password don't match!")
            setLoading(false);
          }

        }
        else{
            toast.error("All fields are mandatory!");
            setLoading(false);
        }
    }
 

    return (
    <div className="signup-wrapper">
        <h2 className="title">Sign Up on <span style={{color:"var(--theme)"}}>Financly</span></h2>
        <form >
        <Input label={"Full Name"} state={name} setState={setName} placeholder={"Johny"} />
        <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder={"Johny@gmail.com"} />
        <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder={"Example@123"} />
        <Input type="password" label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"Example@123"} />
        <Button type="submit" text={"Sign Up using Email and Password"} onClick={signupWithEmail}/>
        <p style={{ textAlign: 'center', margin: 0 }}>or</p>
        <Button text={"Sign Up using Google"} blue={true} />
      </form>
    </div>
    )
}
export default SignUpinComponent;*/
/*import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth,db,provider } from "../../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { getDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

function SignUpinComponent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginForm,setLoginForm]=useState(false);
    const navigate=useNavigate();
    function loginUsingEmail(){
        console.log("Email",email);
        console.log("Password",password);
        setLoading(true);
        if(email!="" && password!=""){
            signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    toast.success("Already Logged In")
        setLoading(false);

    
    navigate("/dashboard");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
        setLoading(false);

  });
        }else{
            toast.error("All fields are mandatory!");
          setLoading(false);

        }
        
    }

    
    function signupWithEmail(event) {
        event.preventDefault();
        setLoading(true);
        console.log("Name", name);
        console.log("Email", email);

        if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed up
                        const user = userCredential.user;
                        console.log("User>>>", user);
                        toast.success("User Created!");
                        setLoading(false);
                        setName("");
                        setEmail("");
                        setPassword("");
                        setConfirmPassword("");
                        createDoc(user);
                        navigate("/dashboard");
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(errorMessage);
                        setLoading(false);
                        // ...
                    });
            } else {
                toast.error("Password and Confirm Password don't match!");
                setLoading(false);
            }
        } else {
            toast.error("All fields are mandatory!");
            setLoading(false);
        }
    }
    async function createDoc(user){
        setLoading(true);
        if(!user){
            return;
        }
        const userRef=doc(db,"users",user.uid);
        const userData=await getDoc(userRef);
        if(!userData.exists()){
             try{
        await setDoc(doc(db, "users", "user.uid"), {
            name:user.displayName? user.displayName:name,
            email:user.email,
            photoURL:user.photoURL? user.photoURL:"",
            createdAt:new Date(),
        });
        toast.success("Doc Created!")
        setLoading(false);
    }
    catch(e){
        toast.error(e.message);
        setLoading(false);
    }
        }else{
            toast.error("Doc already existed")
            setLoading(false);
        }
      

    }
    function googleAuth(){
        setLoading(true);
        try{
           signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    
    createDoc(user);
    navigate("/dashboard");
    toast.success("User authenticated!");
    setLoading(false);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoading(false);
    // The email of the user's account used.
    
    // ...
  });
        }
        catch(e){
          toast.error(e.message);
          setLoading(false);

        }
    }

    return (
        <>
        {loginForm ?(
            <div className="signup-wrapper">
            <h2 className="title">
                Login on <span style={{ color: "var(--theme)" }}>Financly</span>
            </h2>
            <form onSubmit={signupWithEmail}>
                
                <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder={"Johny@gmail.com"} />
                <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder={"Example@123"} />
    
                <Button onClick={googleAuth} style={{cursor:"pointer"}} disabled={loading}  text={loading?"Loading...":"Login using Email and Password"} onClick={loginUsingEmail} />
                <p className="p-login">or</p>
                <Button style={{cursor:"pointer"}} text={loading ?"Loading" :"Login using Google"} blue={true} />
                <p className="p-login" style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Don't Have An Account Already</p>
            </form>
        </div>
        ):(        <div className="signup-wrapper">
            <h2 className="title">
                Sign Up on <span style={{ color: "var(--theme)" }}>Financly</span>
            </h2>
            // <form /*onSubmit={signupWithEmail}*/ 
                /*<Input label={"Full Name"} state={name} setState={setName} placeholder={"Johny"} />
                <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder={"Johny@gmail.com"} />
                <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder={"Example@123"} />
                <Input type="password" label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"Example@123"} />
                <Button disabled={loading} style={{cursor:"pointer"}} text={loading?"Loading...":"Sign Up using Email and Password"} onClick={signupWithEmail} />
                <p className="p-login">or</p>
                <Button onClick={googleAuth} style={{cursor:"pointer"}} text={loading ?"Loading" :"Sign Up using Google"} blue={true} />
                <p className="p-login"style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Have An Account Already?</p>

            </form>
        </div>)}
        {/* <div className="signup-wrapper">
            <h2 className="title">
                Sign Up on <span style={{ color: "var(--theme)" }}>Financly</span>
            </h2>
            <form onSubmit={signupWithEmail}>
                <Input label={"Full Name"} state={name} setState={setName} placeholder={"Johny"} />
                <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder={"Johny@gmail.com"} />
                <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder={"Example@123"} />
                <Input type="password" label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"Example@123"} />
                <Button disabled={loading}  text={loading?"Loading...":"Sign Up using Email and Password"} onClick={signupWithEmail} />
                <p style={{ textAlign: "center", margin: 0 }}>or</p>
                <Button text={loading ?"Loading" :"Sign Up using Google"} blue={true} />
            </form>
//         </div> 
//         </>
//     );
// }*/

// export default SignUpinComponent;
// */}


import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignUpinComponent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState(false);
    const navigate = useNavigate();

    const loginUsingEmail = async () => {
        console.log("Email", email);
        console.log("Password", password);
        setLoading(true);
        if (email !== "" && password !== "") {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                toast.success("Logged In Successfully");
                setLoading(false);
                navigate("/dashboard");
            } catch (error) {
                toast.error(error.message);
                setLoading(false);
            }
        } else {
            toast.error("All fields are mandatory!");
            setLoading(false);
        }
    };

    const signupWithEmail = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log("Name", name);
        console.log("Email", email);

        if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    console.log("User>>>", user);
                    toast.success("User Created!");
                    setLoading(false);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    await createDoc(user);
                    navigate("/dashboard");
                } catch (error) {
                    toast.error(error.message);
                    setLoading(false);
                }
            } else {
                toast.error("Password and Confirm Password don't match!");
                setLoading(false);
            }
        } else {
            toast.error("All fields are mandatory!");
            setLoading(false);
        }
    };

    const createDoc = async (user) => {
        setLoading(true);
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);
        if (!userData.exists()) {
            try {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName ? user.displayName : name,
                    email: user.email,
                    photoURL: user.photoURL ? user.photoURL : "",
                    createdAt: new Date(),
                });
                toast.success("Doc Created!");
                setLoading(false);
            } catch (e) {
                toast.error(e.message);
                setLoading(false);
            }
        } else {
            toast.error("Doc already existed");
            setLoading(false);
        }
    };

    const googleAuth = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await createDoc(user);
            navigate("/dashboard");
            toast.success("User authenticated!");
            setLoading(false);
        } catch (e) {
            toast.error(e.message);
            setLoading(false);
        }
    };

    return (
        <>
            {loginForm ? (
                <div className="signup-wrapper">
                    <h2 className="title">
                        Login on <span style={{ color: "var(--theme)" }}>Financly</span>
                    </h2>
                    <form>
                        <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder={"Johny@gmail.com"} />
                        <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder={"Example@123"} />
                        <Button onClick={loginUsingEmail} style={{ cursor: "pointer" }} disabled={loading} text={loading ? "Loading..." : "Login using Email and Password"} />
                        <p className="p-login">or</p>
                        <Button onClick={googleAuth} style={{ cursor: "pointer" }} disabled={loading} text={loading ? "Loading..." : "Login using Google"} blue={true} />
                        <p className="p-login" style={{ cursor: "pointer" }} onClick={() => setLoginForm(!loginForm)}>Or Don't Have An Account Already</p>
                    </form>
                </div>
            ) : (
                <div className="signup-wrapper">
                    <h2 className="title">
                        Sign Up on <span style={{ color: "var(--theme)" }}>Financly</span>
                    </h2>
                    <form onSubmit={signupWithEmail}>
                        <Input label={"Full Name"} state={name} setState={setName} placeholder={"Johny"} />
                        <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder={"Johny@gmail.com"} />
                        <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder={"Example@123"} />
                        <Input type="password" label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"Example@123"} />
                        <Button style={{ cursor: "pointer" }} disabled={loading} text={loading ? "Loading..." : "Sign Up using Email and Password"} onClick={signupWithEmail} />
                        <p className="p-login">or</p>
                        <Button onClick={googleAuth} style={{ cursor: "pointer" }} disabled={loading} text={loading ? "Loading..." : "Sign Up using Google"} blue={true} />
                        <p className="p-login" style={{ cursor: "pointer" }} onClick={() => setLoginForm(!loginForm)}>Or Have An Account Already?</p>
                    </form>
                </div>
            )}
        </>
    );
}

export default SignUpinComponent;
