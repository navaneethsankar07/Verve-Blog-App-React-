import React, { useState } from 'react'
import {doGoolesignIn,doSignup} from '../firebase/auth'
import { useAuth } from './authContext/Authcontext'
import { Navigate,Link } from 'react-router-dom'
import { useReducer } from 'react'

function Signup() {
    const {userLoggedIn} = useAuth()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [isSigningUp,setSigningUp] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)

    const onSubmit = async (e)=>{
        e.preventDefault()
        if(isSigningUp) return;
        setError(null)
        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }setSigningUp(true)
        setError(null)
        try{
            await doSignup(email,password,name)
        }catch(err){
            let userMessage = "Failed to create account. Please try again.";

            if (err.code) {
                switch (err.code) {
                    case 'auth/invalid-email':
                        userMessage = "The email address is not valid. Please check the format.";
                        break;
                    case 'auth/email-already-in-use':
                        userMessage = "An account already exists with that email address. Try logging in.";
                        break;
                    case 'auth/weak-password':
                        userMessage = "The password is too weak. It must be at least 6 characters long.";
                        break;
                    default:
                        userMessage = "An unknown error occurred. Please check after some time.";
                }
            }
            
            setError(userMessage)
            setSigningUp(false)
        }
    }

    const onGoogleSignIn =async (e) => {
        e.preventDefault()
        if(isSigningUp)return;
            setSigningUp(true)
            try{
                await doGoolesignIn(email,password)
                
        }catch(err){
            setError("Failed to sign in with Google.")
            setSigningUp(false)
        }

        
    }
  return (
    <>
    {userLoggedIn && (<Navigate to={'/'} replace={true}/>) }
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

            <div className="max-w-md mx-auto">
                <div>
                <h1 className="text-2xl text-gray-800 font-semibold">Create Your Account</h1>
                <p className="mt-2 text-sm text-gray-500">Already have an account? <Link to="/login" className="text-cyan-600 font-medium hover:underline">Log in here.</Link></p>
                </div>
                
                {error && (
                    <div className="mt-4 p-3 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-lg">
                        {error}
                    </div>
                )}
                
                <div className="divide-y divide-gray-200">
                    <form onSubmit={onSubmit}>
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                    <input 
                        autoComplete="off" 
                        onChange={(e)=> setName(e.target.value)} 
                        id="name" 
                        name="name" 
                        type="text" 
                        required
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600" 
                        placeholder="Name" 
                    />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Enter Your Name</label>
                    </div>
                    
                    <div className="relative">
                    <input 
                        autoComplete="off" 
                        onChange={(e)=> setEmail(e.target.value)} 
                        id="email" 
                        name="email" 
                        type="email" 
                        required
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600" 
                        placeholder="Email address" 
                    />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Enter your email address</label>
                    </div>

                    <div className="relative">
                    <input 
                        autoComplete="off" 
                        onChange={(e)=> setPassword(e.target.value)} 
                        id="password" 
                        name="password" 
                        type="password" 
                        required
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600" 
                        placeholder="Password" 
                    />
                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Enter Password</label>
                    </div>

                    <div className="relative">
                    <input 
                        autoComplete="off" 
                        onChange={(e)=> setConfirmPassword(e.target.value)} 
                        id="confirmpassword" 
                        name="confirmpassword" 
                        type="password" 
                        required
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600" 
                        placeholder="Confirm Password" 
                    />
                    <label htmlFor="confirmpassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirm Password</label>
                    </div>
                    
                    <div className="relative">
                    <button 
                        type='submit' 
                        disabled={isSigningUp}
                        className={`w-full bg-black text-white rounded-md px-2 py-3 font-semibold transition duration-150 ease-in-out ${isSigningUp ? 'opacity-70 cursor-not-allowed' : 'hover:bg-cyan-600'}`}
                    >
                        {isSigningUp ? 'Creating Account...' : 'Sign Up'}
                    </button>
                    </div>
                </div>
                    </form>
                </div>
            </div>

            <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                        Or
                    </span>
                </div>
            </div>


            <div className="w-full flex justify-center mt-6">
                <button 
                onClick={onGoogleSignIn} 
                disabled={isSigningUp}
                className={`flex items-center bg-black rounded-lg shadow-md px-6 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ${isSigningUp ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                <svg className="h-6 w-6 mr-2" viewBox="-0.5 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg"> 
                    <path d="M9.827 24c0-1.524 0.253-2.986 0.705-4.356L2.623 13.604C1.082 16.734 0.214 20.26 0.214 24c0 3.737 0.867 7.261 2.406 10.388l7.901-5.947c-0.453-1.366-0.703-2.827-0.703-4.388" fill="#FBBC05"/>
                    <path d="M23.714 10.133c3.311 0 6.302 1.173 8.652 3.093l6.836-6.827c-4.166-3.636-9.508-5.877-15.49-5.877C14.427 0.533 6.445 5.844 2.623 13.604l7.909 6.039c1.823-5.532 7.018-9.511 13.181-9.511" fill="#EB4335"/>
                    <path d="M23.714 37.867c-6.165 0-11.36-3.979-13.182-9.511L2.623 34.395c3.822 7.761 11.803 13.072 23.714 13.072 5.732 0 11.204-2.035 15.311-5.849l-7.507-5.804c-2.119 1.334-4.786 2.052-7.807 2.052" fill="#34A853"/>
                    <path d="M46.145 24c0-1.387-0.214-2.88-0.534-4.267H23.714v9.067h12.604c-0.63-3.091-2.345-5.468-4.799-7.014L46.145 24" fill="#4285F4"/>
                </svg>
                <span>Continue with Google</span>
                </button>
            </div>

        </div>
    </div>
        
    </>
  )
}

export default Signup