import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  nickname: string;
  email: string;
}

interface PrivateQuiz {
  id: string;
  title: string;
  pin: string;
}

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  privateQuizPins: PrivateQuiz[];
  login: (email: string, password: string) => Promise<void>;
  signup: (nickname: string, email: string, password: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
  addPrivateQuizPin: (quiz: PrivateQuiz) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(true); // Default to guest mode
  const [privateQuizPins, setPrivateQuizPins] = useState<PrivateQuiz[]>([]);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    setUser({ nickname: "Alex Johnson", email });
    setIsGuest(false);
  };

  const signup = async (nickname: string, email: string, password: string) => {
    // Mock signup - in real app, this would call an API
    setUser({ nickname, email });
    setIsGuest(false);
  };

  const loginAsGuest = () => {
    setUser(null);
    setIsGuest(true);
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    setPrivateQuizPins([]);
  };

  const addPrivateQuizPin = (quiz: PrivateQuiz) => {
    setPrivateQuizPins(prev => [...prev, quiz]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isGuest,
        privateQuizPins,
        login,
        signup,
        loginAsGuest,
        logout,
        addPrivateQuizPin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
