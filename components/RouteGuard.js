import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/lib/authenticate";

const PUBLIC_PATHS = ["/login", "/register", "/about", "/"];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    checkAuth(router.asPath);

    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", checkAuth);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", checkAuth);
    };
  }, []);

  function hideContent() {
    setAuthorized(false);
  }

  function checkAuth(url) {
    const path = url.split("?")[0];
    const token = getToken();

    if (!token && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}
