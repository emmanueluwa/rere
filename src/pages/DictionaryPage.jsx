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
    <form
      className="flex justify-center space-x-2 max-w-[300px]"
      onSubmit={() => {
        navigate("/definition/" + word);
      }}
    >
      <input
        className="px-2 rounded py-1 shrink min-w-0"
        placeholder="definition"
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded">
        Search
      </button>
    </form>
  );
}
