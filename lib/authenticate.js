import jwtDecode from "jwt-decode";

// Automatically detect API URL:
// - On localhost → use http://localhost:3000
// - On Vercel → use your deployed domain
const API =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const TOKEN_KEY = "access_token";

// Save token
export function setToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

// Get token
export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

// Remove token
export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

// Decode token
export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

// Check authentication
export function isAuthenticated() {
  const decoded = readToken();
  if (!decoded) return false;
  return decoded.exp > Date.now() / 1000;
}

// ----------------------
//      API CALLS
// ----------------------

// Register user
export async function registerUser(userName, password, password2) {
  const res = await fetch(`${API}/api/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password, password2 }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Registration failed");
  }

  return res.json();
}

// Login user
export async function authenticateUser(userName, password) {
  const res = await fetch(`${API}/api/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Login failed");
  }

  const data = await res.json();
  setToken(data.token);
  return true;
}
