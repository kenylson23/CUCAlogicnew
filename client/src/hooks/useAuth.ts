import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [localUser, setLocalUser] = useState<any>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("user");
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setLocalUser(JSON.parse(storedUser));
    }
  }, []);

  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      if (!token) return null;
      
      try {
        const response = await apiRequest("/api/auth/user");
        return response;
      } catch (error) {
        // Token invalid, clear local storage
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        setToken(null);
        setLocalUser(null);
        return null;
      }
    },
    enabled: !!token,
    retry: false,
  });

  const logout = async () => {
    try {
      await apiRequest("/api/auth/logout", { method: "POST" });
    } catch (error) {
      // Ignore logout errors
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      setToken(null);
      setLocalUser(null);
      window.location.href = "/login";
    }
  };

  return {
    user: user || localUser,
    isLoading: token ? isLoading : false,
    isAuthenticated: !!(user || localUser),
    logout,
  };
}