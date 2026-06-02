function Profile({ user, handleLogout }) {
  return (
    <div>
      <img
        src={user.photoURL}
        alt="Profile"
        width="100"
      />

      <h2>{user.displayName}</h2>

      <p>{user.email}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;