import { useEffect, createContext, useContext } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, authService }) => {
  const signin = authService.signin.bind(authService);
  const signup = authService.signup.bind(authService);
  const logout = authService.logout.bind(authService);
  const islogin = authService.islogin;

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
}