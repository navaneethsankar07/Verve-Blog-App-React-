import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../authentication/authContext/Authcontext';
import { signOut } from '../firebase/auth';
import logo from '../assets/verve.png'
import { FaUserCircle } from "react-icons/fa"; 

function Navbar({ myblog }) {
  const { userLoggedIn,currentUser } = useAuth();
  const navigate = useNavigate();
  const email = userLoggedIn ? currentUser?.email : null;
  const firstLetter = email ? email.charAt(0).toUpperCase() : '';

  const logout = async (e) => {
    if (confirm('Do you want to logout?')) {
      e.preventDefault();
      try {
        await signOut();
        navigate('/login');
      } catch (err) {
        console.error("Failed to sign out:", err);
      }
    }
  };

  return (
    <header className="flex p-5 justify-between items-center mb-10 pb-4 border-b border-gray-300">
      <img src={logo} alt="Verve logo" className="h-12" />

      <div className="flex gap-3 items-center">
        <Link to={userLoggedIn ? '/create-blog' : '/login'}>
          <button className="flex items-center bg-black text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-gray-600 transition duration-200">
            <span className="h-5 w-5 mr-2 -mt-7 text-[30px]">+</span>
            Create New Post
          </button>
        </Link>

        {myblog ? (
          <Link to={'/'}>
            <button className="flex items-center bg-black text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-200">
              Home
            </button>
          </Link>
        ) : (
          <Link to={userLoggedIn ? '/myblogs' : '/login'}>
            <button className="flex items-center bg-black hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-200">
              My Blogs
            </button>
          </Link>
        )}

        <Link to={userLoggedIn ? '' : '/login'}>
          <button
            onClick={userLoggedIn ? logout : null}
            className="flex items-center bg-black text-white hover:bg-gray-600 font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-200"
          >
            {userLoggedIn ? 'Logout' : 'Login'}
          </button>
        </Link>
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg shadow-md">
          {userLoggedIn ? firstLetter : <FaUserCircle size={26} />}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
