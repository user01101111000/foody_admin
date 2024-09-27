import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const adminID = localStorage.getItem("_fAx4");

  const [user, setUser] = useState(adminID || null);

  const generateUserLoginDatas = (userUID, remember) => {
    if (remember) localStorage.setItem("_fAx4", userUID);

    setUser(userUID);
  };

  const generateUserLogoutDatas = () => {
    localStorage.removeItem("_fAx4");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, generateUserLoginDatas, generateUserLogoutDatas }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
