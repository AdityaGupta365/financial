import React from "react"
import Header from "../components/Header";
import SignUpinComponent from "../components/SignupSignin";
// import "./styles.css"
function SignUp(){
    return <div>
        <Header/>
        <div className="wrapper">
            <SignUpinComponent/>
        </div>
    </div>
}
export default SignUp;