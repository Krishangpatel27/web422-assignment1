import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { favouritesAtom } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function BookDetails({ book }) {
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  if (!book) return null;

  const workId = book.key;   // <— THIS IS YOUR UNIQUE ID

  // Sync button state with DB favourites
  useEffect(() => {
    setShowAdded(favourites?.includes(workId));
  }, [favourites, workId]);

  // Handle add/remove
  async function toggleFavourite() {
    if (showAdded) {
      setFavourites(await removeFromFavourites(workId));
    } else {
      setFavourites(await addToFavourites(workId));
    }
  }

  return (
    <Container>
      <Row>
        <Col lg="4">
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src =
                "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
          />
          <br /><br />

          {/* ⭐ FAVOURITE BUTTON ⭐ */}
          <Button
            variant={showAdded ? "danger" : "primary"}
            onClick={toggleFavourite}
          >
            {showAdded ? "- Favourite" : "+ Favourite"}
          </Button>
        </Col>

        <Col lg="8">
          <h3>{book.title}</h3>

          {book.description && (
            <p>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}

          <br />

          {book.subject_people && (
            <>
              <h5>Characters</h5>
              <p>{book.subject_people.join(", ")}</p>
              <br />
            </>
          )}

          {book.subject_places && (
            <>
              <h5>Settings</h5>
              <p>{book.subject_places.join(", ")}</p>
              <br />
            </>
          )}

          {book.links && (
            <>
              <h5>More Information</h5>
              {book.links.map((link, idx) => (
                <span key={idx}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.title}
                  </a>
                  <br />
                </span>
              ))}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
