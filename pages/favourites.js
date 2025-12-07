import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";

export default function Favourites() {
  const [favourites] = useAtom(favouritesAtom);

  if (!favourites) return null;
  if (favourites.length === 0) return <p>Nothing Here</p>;

  return (
    <>
      <h1>Favourites</h1>
      <ul>
        {favourites.map(id => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </>
  );
}
