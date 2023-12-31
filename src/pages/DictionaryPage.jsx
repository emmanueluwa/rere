import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* 
USE LLM TO GIVE ADVICE ON SPECIFIC SAAS INDUSTRY
*/

export default function DictionaryPage() {
  const [word, setWord] = useState("");

  const navigate = useNavigate();

  /*
  useEffect
  takes 2 arguments(the 2nd is optional), 
  - callback function, function passed into another function
  - dependency array
  */
  // useEffect(() => {
  //   console.log("State updated", word);
  // }, [word]);

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <button
        onClick={() => {
          navigate("/definition/" + word, { replace: true });
        }}
      >
        Search
      </button>
    </>
  );
}
