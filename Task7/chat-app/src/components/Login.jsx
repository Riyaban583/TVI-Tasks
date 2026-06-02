function Login({ handleLogin }) {
  return (
    <div>
      <button onClick={handleLogin}>
        Sign In With Google
      </button>
    </div>
  );
}

export default Login;