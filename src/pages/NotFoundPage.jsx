import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <p>The word you entered is not available</p>
      <Link to="/dictionary">Search another word</Link>
    </>
  );
}
