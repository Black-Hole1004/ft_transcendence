import { useState } from "react";
import '../index.css'
import useAuth from "../context/AuthContext";

const RegistrationNotification = () => {
    const {showNotification} = useAuth()
    console.log("["+showNotification+"]")
    return (
        <div>
        {
            showNotification && (
                <div className="border-2"> 
                    test test
                </div>
            )
        }
        </div>
    )
}



export default RegistrationNotification;