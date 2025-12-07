import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import Image from "next/image";

import { favouritesAtom } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function BookDetails({ book }) {
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  // ID may be undefined if book is null → keep it stable
  const workId = book?.key || "";

  // RUN HOOKS ALWAYS — React strict mode requires this
  useEffect(() => {
    if (book && favourites) {
      setShowAdded(favourites.includes(workId));
    }
  }, [favourites, workId, book]);

  if (!book) return null;

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
          <Image
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
            width={400}
            height={600}
            onError={(e) => {
              e.target.src = "https://placehold.co/400x600?text=No+Cover";
            }}
          />
          <br /><br />

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
