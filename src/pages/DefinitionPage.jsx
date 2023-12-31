import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFoundPage from "./NotFoundPage";

export default function DefinitionPage() {
  const [word, setWord] = useState([]);

  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  /*
  destructure, give an object to component
  */
  console.log(useParams());
  let { search } = useParams();

  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
        } else if (res.status === 401) {
          navigate("/login");
        } else if (res.status === 500) {
          setError(true);
        }

        if (!res.ok) {
          setError(true);
          throw new Error("something went wrong");
        }

        return res.json();
      })
      .then((data) => {
        setWord(data[0].meanings);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  if (notFound) {
    return <NotFoundPage />;
  }

  if (error) {
    return (
      <>
        <p>Something went wrong...</p>
        <NotFoundPage />
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
        </>
      ) : null}
    </>
  );
}
