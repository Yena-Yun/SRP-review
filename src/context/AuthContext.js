import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, authService, tokenStorage }) => {
  const [islogin, setIslogin] = useState(!!tokenStorage.get());

  const signin = (email, password) => {
    authService.signin.call(authService, email, password);
    setIslogin(true);
  };

  const signup = authService.signup.bind(authService);

  const logout = () => {
    authService.logout.call(authService);
    setIslogin(false);
  };


  return (
    <AuthContext.Provider
      value={{
        signin,
        signup,
        logout,
        islogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};