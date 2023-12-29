import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Influencer from "./components/Influencer";

function App() {
  const [role, setRole] = useState("pet food");
  const showInfluencers = true;

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      {showInfluencers ? (
        <div>
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setRole(e.target.value);
            }}
          />
          <Influencer name="fulo" role="builder" />
          <Influencer name="usman" />
          <Influencer name="esa" role={role} />
        </div>
      ) : (
        <p>Influencers hidden</p>
      )}
    </>
  );
}

export default App;
