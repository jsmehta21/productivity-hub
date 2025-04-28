import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Adjust the path if needed
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const UserProfile = () => {
  const { user } = useContext(AuthContext); // Get user from context

  // Function to handle logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.displayName || 'User'}</h1>
          <p>Email: {user.email}</p>
          {user.photoURL && <img src={user.photoURL} alt="Profile" />}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
};

export default UserProfile;
