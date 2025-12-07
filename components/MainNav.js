import Link from "next/link";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { getToken, removeToken } from "@/lib/authenticate";
import { useRouter } from "next/router";

export default function MainNav() {
  const router = useRouter();
  const token = getToken();   // <-- FIXED

  function logout() {
    removeToken();
    router.push("/login");
  }

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark">
        <Container>
          <Navbar.Brand>Krishang Patel</Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">Books</Nav.Link>
            <Nav.Link as={Link} href="/about">About</Nav.Link>
          </Nav>

          {/* Logged In Menu */}
          {token && (
            <Nav>
              <NavDropdown title={token.userName} align="end">
                <NavDropdown.Item as={Link} href="/favourites">
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}

          {/* Logged Out Menu */}
          {!token && (
            <Nav>
              <Nav.Link as={Link} href="/register">Register</Nav.Link>
              <Nav.Link as={Link} href="/login">Login</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>

      <br /><br />
    </>
  );
}
