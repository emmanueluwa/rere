import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFoundPage from "./NotFoundPage";
import DefinitionSearch from "../components/DefinitionSearch";
import useFetch from "../hooks/useFetch";

export default function DefinitionPage() {
  // const [word, setWord] = useState([]);

  // const [notFound, setNotFound] = useState(false);
  // const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /*
  destructure, give an object to component
  */
  let { search } = useParams();

  /* 
  custom hook
  - structure of the data word[0].meanings
  - - grab meaning and rename it to word { meanings: word}
  - - [{ meanings: word }] inside aray to get [0]
  - - assign to empty array with empty object => [{}] default value for initial useEffect
  - - - useFetch does not return values immidiately
  */

  const {
    request,
    data: [{ meanings: word }] = [{}],
    errorStatus,
  } = useFetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search);

  useEffect(() => {
    request();
  }, []);

  if (errorStatus === 404) {
    return (
      <>
        <p>The word you entered is not available</p>
        <Link to="/dictionary">Search another word</Link>
      </>
    );
  }

  if (errorStatus) {
    return (
      <>
        <p>Something went wrong...</p>
        <Link to="/dictionary">Search another word</Link>
      </>
    );
  }

  return (
    <>
      {word ? (
        <>
          <h1>Here is a definition: </h1>
          {word.map((meaning) => {
            return (
              <p key={uuidv4()}>
                {meaning.partOfSpeech}: {meaning.definitions[0].definition}
              </p>
            );
          })}
          <p>Search for another word: </p>
          <DefinitionSearch />
        </>
      ) : null}
    </>
  );
}
