import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Alert } from "react-bootstrap";
import { authenticateUser } from "@/lib/authenticate";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const [favourites, setFavourites] = useAtom(favouritesAtom);

  async function updateFavourites() {
    setFavourites(await getFavourites());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setWarning("");

    try {
      await authenticateUser(user, password);
      await updateFavourites();
      router.push("/");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <h1>Login</h1>
      {warning && <Alert variant="danger">{warning}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>

        <Button type="submit">Login</Button>
      </Form>
    </>
  );
}
