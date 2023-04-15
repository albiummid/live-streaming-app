import { SESSION, USER } from "@/constants/variables";
import {
  setIsAuthenticated,
  setSession,
  setUser,
  useAuthState,
} from "@/redux/features/auth/authSlice";
import { LocalDB_GetData } from "@/utils/LocalDB";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

export default function HandleAuth({
  children
}) {
  const { isAuthenticated, user, session } = useAuthState();
  const [isLoading,setIsLoading] = useState(true)
  const router = useRouter();
  const dispatch = useDispatch();
  const { pathname, isReady, query, reload } = router;
  const userData = LocalDB_GetData(USER);
  const sessionData = LocalDB_GetData(SESSION);
  const publicRoutes = useMemo(() => ["/login", "/register"], []);

  useEffect(() => {
    if (!isAuthenticated || !user || !session) {
      if (userData && sessionData) {
        dispatch(setUser(userData));
        dispatch(setSession(sessionData));
        dispatch(setIsAuthenticated(true));
        setIsLoading(false)
      } else {
        const isPublicRoute = publicRoutes.reduce((acc, x) => {
          return pathname.includes(x) || acc;
        }, false);
        if (!isPublicRoute) {
          router.push("/login");
        }
        setIsLoading(false)
      }
    }
  }, [
    userData,
    sessionData,
    isAuthenticated,
    dispatch,
    router,
    user,
    session,
    pathname,
    publicRoutes,
  ]);

  return <div>
    <h1>
      {isLoading && "LOADING >>>>"}
    </h1>
    {children}
  </div>;
}
