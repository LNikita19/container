// // src/context/AuthContext.tsx
// import { createContext, useContext, useState, useEffect } from "react";
// import Cookies from "js-cookie";

// interface AuthContextType {
//   user: string | null;
//   login: (username: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<string | null>(null);

//   useEffect(() => {
//     const cookieUser = Cookies.get("user");
//     if (cookieUser) setUser(cookieUser);
//   }, []);

//   const login = (username: string) => {
//     Cookies.set("user", username);
//     setUser(username);
//   };

//   const logout = () => {
//     Cookies.remove("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used inside AuthProvider");
//   return context;
// }
