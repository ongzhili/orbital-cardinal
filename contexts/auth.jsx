import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter, useSegments } from "expo-router";


const AuthContext = createContext();

export function useProtectedRoute(user) {
    const segments = useSegments();

    useEffect(() => {
        console.log(`useProtectedRoute useEffect called`);
        const inAuthGroup = segments[1] === "auth";
        const inCommunity = segments[0] === "community";

        
        if (user == null & !inAuthGroup & inCommunity) {
            console.log(segments);
            console.log("sent to login");
        } else if (user) {
            console.log(segments);
            console.log('a');
        }
    }, [router, segments, user])
}


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    console.log(user);

  
    useEffect(() => {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        console.log(`authStateEvent: ${event}`);
        if (event === "SIGNED_IN") {
          console.log("user set");
          setUser(session.user);
          console.log(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      });
  
      return () => data.subscription.unsubscribe();
    }, []);
  
    return (
      <AuthContext.Provider value={{ user, setUser, }}>
        {children}
      </AuthContext.Provider>
    );
  }

export function useAuth() {
    return useContext(AuthContext);
}