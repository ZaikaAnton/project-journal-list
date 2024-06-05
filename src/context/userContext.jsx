import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext({
  userId: 1,
});

export const UserContextProvider = ({ children }) => {
  // Стейт, который отвечает за изменение userId
  const [userId, setUserId] = useState(1);
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
