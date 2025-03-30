import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    accountName: string;
    email: string;
    birthDate: Date;
    address: string;
    role:string;
    phoneNumber:string;
  }
 
interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void; //h1 them dong nay
    login: (user: User, token: string) => void; //h1 token
    logout: () => void;
    updateUser:(user: User) => void;
  }

  const AuthContext = createContext<AuthContextType | undefined>(undefined);

  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem("token");
      if (storedUser && token) {
        setUser(JSON.parse(storedUser)); // Cập nhật user từ localStorage
      }
    }, []);

   // const login = (userData: User) => setUser(userData);
   const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };
  const updateUser=(userData : User)=>{
    setUser(userData);
  }
    // const logout = () => setUser(null);
    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    };
    return (
      <AuthContext.Provider value={{ user, setUser, login, logout,updateUser }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
