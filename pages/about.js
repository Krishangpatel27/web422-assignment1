import { Card } from 'react-bootstrap';
import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export default function About({ book }) {
  return (
    <>
      <PageHeader text="About the Developer – Krishang Patel" />
      <Card>
        <Card.Body>
          <p>Hello! This is my assignment 1 for WEB422</p>
          <p>I am currently enrolled in CPA Program</p>
          <p>Here’s one of my favourite books:</p>
        </Card.Body>
      </Card>
      <br />
      <BookDetails book={book} />
    </>
  );
}

// Fetch a specific book by Work ID
export async function getStaticProps() {
  const res = await fetch('https://openlibrary.org/works/OL453657W.json');
  const data = await res.json();
  return { props: { book: data } };
}
