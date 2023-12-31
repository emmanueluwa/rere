import { useState, useEffect } from "react";

/* 
USE LLM TO GIVE ADVICE ON SPECIFIC SAAS INDUSTRY
*/

export default function DictionaryPage() {
  const [word, setWord] = useState("");
  const [word2, setWord2] = useState("");

  /*
  useEffect
  takes 2 arguments(the 2nd is optional), 
  - callback function, function passed into another function
  - dependency array
  */
  useEffect(() => {
    console.log("State updated", word);
  }, [word]);

  useEffect(() => {
    console.log("State updated", word2);
  }, [word2]);

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <h2>get the definition of {word}</h2>

      <input
        type="text"
        onChange={(e) => {
          setWord2(e.target.value);
        }}
      />
      <h2>get the definition of {word2}</h2>
    </>
  );
}
