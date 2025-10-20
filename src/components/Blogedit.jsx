import  { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../authentication/authContext/Authcontext';

import React from 'react'
import Navbar from './Navbar';
import { toast } from 'react-toastify';

function Blogedit() {
 const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const postData = docSnap.data();
          if (postData.userEmail !== currentUser?.email) {
            setError('Not authorized');
            setLoading(false);
            return;
          }
          setTitle(postData.title);
          setContent(postData.content);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, currentUser]);

  const handleSubmit = async (e) => {
e.preventDefault();
if(confirm('confirm update')){
try {
      const docRef = doc(db, 'blogs', id);
      await updateDoc(docRef, { title, content });
      navigate('/myblogs');
      toast.success('Post updated successfully')
    } catch (err) {
      toast.error('Failed to update post');
    }
  };
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
    <div className="min-h-screen flex justify-center items-center bg-gray-100 ">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl text-black font-bold mb-4">Edit Blog</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-black text-black border px-3 py-2 rounded mb-4"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border-black text-black border px-3 py-2 rounded mb-4"
          rows={6}
          />
          <div className='flex gap-5'>
            <Link to={-1}>
            <button className="w-50 bg-red-600 text-white py-2 rounded hover:bg-red-500 transition">
          Cancel
        </button>
            </Link>
        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition">
          Update Post
        </button>
          </div>
  
      </form>
    </div>
          </>
  );
}


export default Blogedit;