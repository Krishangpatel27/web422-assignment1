import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/lib/authenticate";

const PUBLIC_PATHS = ["/login", "/register", "/about", "/"];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Stable function (prevents React warnings)
  const checkAuth = useCallback(
    (url) => {
      const path = url.split("?")[0];
      const token = getToken();

      if (!token && !PUBLIC_PATHS.includes(path)) {
        setAuthorized(false);
        router.push("/login");
      } else {
        setAuthorized(true);
      }
    },
    [router]   // router is the ONLY dependency
  );

  // Stable hideContent
  const hideContent = useCallback(() => {
    setAuthorized(false);
  }, []);

  useEffect(() => {
    // initial auth check
    checkAuth(router.asPath);

    // attach listeners
    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", checkAuth);

    // cleanup
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", checkAuth);
    };
  }, [checkAuth, hideContent, router.events, router.asPath]);

  if (!authorized) return null;

  return children;
}
