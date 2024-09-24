import { createContext, useState } from 'react';

interface IUserContextType {
    savedUser: IUser | null;
    saveUser: (user: IUser) => void;
}

interface IUser {
    id: string;
    name: string | null;
    email: string | null;
    imageUrl: string | null;
}


export const UserContext = createContext<IUserContextType | null>(null);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [savedUser, setUser] = useState<IUser | null>(null);

  const saveUser = (user: IUser) => {
    console.log(user)
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user));
    
  }

  

  return (
    <UserContext.Provider value={{ savedUser, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};
