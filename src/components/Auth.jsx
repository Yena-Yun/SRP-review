import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Auth() {
  const [userInputs, setUserInputs] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userInputs;

  const saveUserInputs = ({ target }) => {
    const { name, value } = target;

    setUserInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { signin, signup, logout, islogin } = useAuth();

  const handleSignin = () => {
    signin(email, password)
  };

  const handleSignup = () => {
    signup(email, password);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {!islogin && (
        <>
          <div>
            <label>
              email
              <input value={email} name='email' onChange={saveUserInputs} />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                value={password}
                name='password'
                onChange={saveUserInputs}
              />
            </label>
          </div>
        </>
      )}
      {islogin ? (
        <button onClick={logout}>logout</button>
      ) : (
        <>
          <button onClick={handleSignin}>signin</button>
          <button onClick={handleSignup}>signup</button>
        </>
      )}
    </form>
  );
}

export default Auth;
