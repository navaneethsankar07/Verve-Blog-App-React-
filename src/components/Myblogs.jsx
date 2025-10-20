import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../firebase/auth';
import { useAuth } from '../authentication/authContext/Authcontext';
import { collection, query, onSnapshot, limit, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Navbar from './Navbar';

function Myblogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();

  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'blogs', id));
      setPosts(posts.filter((post) => post.id !== id));
      toast.sucess("Post deleted successfully");
    } catch (err) {
      console.error("Failed to delete post:", err);
      toast.error("Failed to delete post");
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    const postsRef = collection(db, 'blogs');
    const postsQuery = query(postsRef, limit(50)); 

    const unsubscribeSnapshot = onSnapshot(
      postsQuery,
      (snapshot) => {
        const fetchedPosts = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((post) => post.userEmail === currentUser?.email);

        fetchedPosts.sort((a, b) => {
          const dateA = a.createdAt?.seconds || 0;
          const dateB = b.createdAt?.seconds || 0;
          return dateB - dateA;
        });

        setPosts(fetchedPosts);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Firestore error:', err);
        setError('Failed to load posts in real-time.');
        setLoading(false);
      }
    );

    return () => unsubscribeSnapshot();
  }, [currentUser]);

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 min-h-screen">
        <p className="text-xl font-bold">Error Loading Posts: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-396 bg-gradient-to-b from-gray-50 to-gray-200">
      <Navbar myblog={true} />

      <div className="w-full px-5 lg:px-25">
        <h1 className="text-5xl mb-6 font-extrabold text-gray-900 tracking-tight">
          My Blog Posts
        </h1>

        {loading ? (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <svg
              className="animate-spin h-6 w-6 text-gray-600 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 
                5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"
              ></path>
            </svg>
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg font-medium">No blog posts yet.</p>
            <p className="text-sm">Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="space-y-8 pb-10">
            {posts.map((post) => {
              const date = post.createdAt?.toDate
                ? post.createdAt.toDate().toLocaleDateString()
                : 'Loading...';

              return (
                <div
                  key={post.id}
                  className="border border-gray-200 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <h2 className="text-2xl text-black font-semibold mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {post.content}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>✍️ {post.userEmail || 'Anonymous'}</span>
                    <span className="flex gap-4 items-center">
                      <span>🕒 {date}</span>

                      {userLoggedIn && post.userEmail === currentUser?.email && (
                        <>
                          <Link to={`/edit-blog/${post.id}`}>
                            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">
                              Edit
                            </button>
                          </Link>

                          <button
                            onClick={() => handleDelete(post.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Myblogs;
