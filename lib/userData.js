import { getToken } from "./authenticate";

const API = "http://localhost:8080";   // <--- same hard-coded base

async function authFetch(path, method = "GET", body = null) {
  const token = getToken();

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `JWT ${token}` : "",
    },
  };

  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${API}${path}`, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  return res.json();
}

export async function getFavourites() {
  return authFetch(`/api/user/favourites`);
}

export async function addToFavourites(id) {
  return authFetch(`/api/user/favourites/${id}`, "PUT");
}

export async function removeFromFavourites(id) {
  return authFetch(`/api/user/favourites/${id}`, "DELETE");
}
