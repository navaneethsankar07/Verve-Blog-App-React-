import React from 'react'
import { useState } from 'react'
import { useAuth } from '../authentication/authContext/Authcontext'
import { Navigate,useNavigate } from 'react-router-dom'
import {getFirestore,doc,setDoc,serverTimestamp,collection, addDoc} from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'
import Navbar from './Navbar'
import { toast } from 'react-toastify'


function Createblog() {
    const navigate = useNavigate()
    const {userLoggedIn,currentUser} = useAuth()
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [issaving, setSaving] = useState(false)
    const [error, setError] = useState(null)

    if(!userLoggedIn){
        return <Navigate to='/login' replace/>;
    }
const postCollection = collection(db , "blogs")

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError(null)
        if(issaving)return;
        if(!title.trim()){
            toast('Title is Required');

            return
        }
        if(!content.trim()){
            toast('Content is Required')
            return
        }
        setSaving(true)
        try{
            if (!auth.currentUser) {
  setError("User not logged in");
  setSaving(false);
  return;
} ""
            await addDoc(postCollection,{title:title.trim(),content:content.trim(),createdAt:serverTimestamp(),userEmail: auth.currentUser.email,
  userId: auth.currentUser.uid})
                
            setTitle('');
            setContent('');
            navigate('/')
            toast('Blog created successfully')
        }catch(err){
            console.log(err)

        } finally {
        setSaving(false);
    }
    }

  return (
    
    <div className=" w-400 h-203  bg-white ">
        <Navbar myblog={true}/>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-cyan-500 pb-3 text-center tracking-tight">
                Create a New Blog Post
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 p-5 bg-white">
                
                {error && (
                    <div className="p-4 mb-4 rounded-xl font-semibold bg-red-100 text-red-700 border border-red-300">
                         {error}
                    </div>
                )}
                
                <div>
                    <label htmlFor="title" className="block text-lg font-bold text-gray-800 mb-2">Post Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border-2  border-gray-300 p-4 rounded-xl shadow-inner focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200 transition duration-200 text-lg text-black placeholder-gray-400"
                        placeholder="A captivating title..."
                        
                        disabled={issaving}
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-lg font-bold text-gray-800 mb-2">Content</label>
                    <textarea
                        id="content"
                        rows="7"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full text-black border-2 border-gray-300 p-4 rounded-xl shadow-inner focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200 transition duration-200 resize-y text-base placeholder-gray-400"
                        placeholder="Write your amazing post content here..."
                        
                        disabled={issaving}
                    />
                </div>

                <button
                    type="submit"
                    disabled={issaving}
                    className={`w-full py-4 px-4 rounded-xl font-extrabold text-white text-xl uppercase tracking-wider transition duration-300 transform hover:scale-[1.005] ${issaving ? 'bg-gray-500 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700 shadow-lg shadow-cyan-400/50'}`}
                >
                    {issaving ? (
                        <div className="flex items-center justify-center space-x-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Publishing...</span>
                        </div>
                    ) : (
                        'Publish Post'
                    )}
                </button>
                
                <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                    Posting as: <span className="font-semibold text-gray-700">{currentUser?.email || 'Loading User...'}</span>
                </div>
            </form>
        </div>
  )
}

export default Createblog