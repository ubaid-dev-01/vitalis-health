import { createContext, useContext, useState, ReactNode } from "react";

interface UserType {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<UserType>) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  updateProfile: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("vitalis_auth") === "true"
  );
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("vitalis_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const mockUser = { name: "Dr. Admin", email, avatar: "DA", role: "Admin" };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem("vitalis_auth", "true");
    localStorage.setItem("vitalis_user", JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("vitalis_auth");
    localStorage.removeItem("vitalis_user");
  };

  const updateProfile = (data: Partial<UserType>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data, avatar: (data.name || prev.name).split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() };
      localStorage.setItem("vitalis_user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
